'use client';

import { refetchToken } from '@/apis/user.api';
import configs from '@/configs';
import type { UserAuthData } from '@/types/user.type';
import { getCookie, removeAccessToken, removeRefreshToken } from '@/utils/cookies';
import JwtDecode from '@/utils/jwtDecode';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

import { useMutation } from '@tanstack/react-query';

const useAuth = () => {
  // Use a single state object to prevent multiple re-renders
  const [authState, setAuthState] = useState<{
    user: UserAuthData | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
  }>({
    user: null,
    isAuthenticated: false,
    isInitialized: false,
  });

  // Use a ref to track the last token value to prevent unnecessary re-renders
  const lastTokenRef = useRef<string | null>(null);

  // Use cookies but don't make the component re-render on every cookie change
  const [cookies] = useCookies([configs.cookies.accessToken, configs.cookies.refreshToken]);
  const accessToken = cookies[configs.cookies.accessToken];
  const refreshToken = cookies[configs.cookies.refreshToken];

  // Track if the component is mounted to prevent state updates after unmount
  const isMountedRef = useRef(true);

  const { mutate: refreshTokenMutation, isPending: isLoading } = useMutation({
    mutationFn: () => refetchToken(refreshToken),
    onSuccess: (data) => {
      if (!isMountedRef.current) return;

      if (data?.data.access_token) {
        const decodedData = JwtDecode(data.data.access_token);
        const userData = {
          id: decodedData.id,
          phoneNumber: decodedData.phone,
          role: decodedData.role,
          exp: decodedData.exp,
          isNewUser: getCookie(configs.cookies.isNew),
        };

        setAuthState((prev) => ({
          ...prev,
          user: userData,
          isAuthenticated: true,
        }));
      }
    },
    onError: (error) => {
      if (!isMountedRef.current) return;

      console.error('Token refresh failed:', error);
      removeAccessToken();
      removeRefreshToken();

      setAuthState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
      }));
    },
  });

  // Process the token and update auth state
  const processToken = useCallback(
    (token: string | undefined) => {
      if (!token) {
        setAuthState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        }));
        return;
      }

      try {
        const decodedToken = JwtDecode(token);

        // Check if token is valid and not expired
        if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
          // Only refresh if we have a refresh token
          if (refreshToken) {
            refreshTokenMutation();
          } else {
            setAuthState((prev) => ({
              ...prev,
              user: null,
              isAuthenticated: false,
              isInitialized: true,
            }));
          }
          return;
        }

        const userData = {
          id: decodedToken.id,
          phoneNumber: decodedToken.phone,
          role: decodedToken.role,
          exp: decodedToken.exp,
          isNewUser: getCookie(configs.cookies.isNew),
        };

        setAuthState((prev) => ({
          ...prev,
          user: userData,
          isAuthenticated: true,
          isInitialized: true,
        }));
      } catch (error) {
        console.error('Error processing token:', error);
        setAuthState((prev) => ({
          ...prev,
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        }));
      }
    },
    [refreshToken, refreshTokenMutation],
  );

  // Initialize auth state on mount and when token changes
  useEffect(() => {
    // Skip if the token hasn't changed
    if (lastTokenRef.current === accessToken) return;

    lastTokenRef.current = accessToken;
    processToken(accessToken);
  }, [accessToken, processToken]);

  // Set up token expiration check with a reasonable interval
  useEffect(() => {
    // Only check if we're authenticated
    if (!authState.isAuthenticated || !accessToken) return;

    const checkTokenExpiration = () => {
      try {
        const decodedToken = JwtDecode(accessToken);

        // Check if token will expire in the next minute
        const willExpireSoon = decodedToken && decodedToken.exp < Date.now() / 1000 + 60;

        if (willExpireSoon && refreshToken) {
          refreshTokenMutation();
        }
      } catch (error) {
        console.error('Error checking token expiration:', error);
      }
    };

    // Check less frequently (every 30 seconds instead of 5)
    const intervalId = setInterval(checkTokenExpiration, 30000);

    return () => clearInterval(intervalId);
  }, [accessToken, refreshToken, authState.isAuthenticated, refreshTokenMutation]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Memoize the return value to prevent unnecessary re-renders
  return useMemo(
    () => ({
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      isLoading: isLoading || !authState.isInitialized,
    }),
    [authState.user, authState.isAuthenticated, authState.isInitialized, isLoading],
  );
};

export default useAuth;
