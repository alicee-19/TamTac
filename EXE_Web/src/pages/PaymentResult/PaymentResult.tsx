'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { ArrowRight, CheckCircle2, Home, ShoppingBag, XCircle } from 'lucide-react';
import { Suspense } from 'react';

function PaymentResultContent() {
  // Get payment status from URL params (success or failed)
  const status = 'success';
  const orderId = '2502250036';
  const amount = '372150';
  const paymentMethod = 'momo';

  const isSuccess = status === 'success';

  // Mock payment data
  const paymentData = {
    orderId,
    amount: Number.parseInt(amount),
    paymentMethod,
    transactionId: isSuccess ? 'TXN' + Date.now() : null,
    timestamp: new Date().toLocaleString('vi-VN'),
    customerName: 'Lê Minh Duy',
    customerPhone: '0999888777',
    restaurant: 'Tấm Tắc Láng Đại Học',
    items: [
      { name: 'COMBO - SÀ BÌ CHƯỞNG', quantity: 2, price: 272000 },
      { name: 'CƠM SƯỜN CỘNG', quantity: 1, price: 85000 },
      { name: 'Coca Cola', quantity: 2, price: 24000 },
    ],
    subtotal: 381000,
    discount: 24850,
    deliveryFee: 16000,
    total: Number.parseInt(amount),
  };

  return (
    <div className='min-h-screen from-orange-50 to-amber-50 py-8 px-4 md:px-6'>
      <div className='container mx-auto max-w-2xl'>
        {/* Status Header */}
        <div className='text-center mb-6'>
          <div
            className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              isSuccess ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className='w-10 h-10 text-green-600' />
            ) : (
              <XCircle className='w-10 h-10 text-red-600' />
            )}
          </div>

          <h1 className={`text-3xl font-bold mb-2 ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
            {isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}
          </h1>

          <p className='text-muted-foreground text-lg'>
            {isSuccess ? (
              <>
                Đơn hàng của bạn đã được xác nhận và đang được chuẩn bị.
                <p>
                  Mã giao dịch: <span className='font-medium text-green-600'>{paymentData.transactionId}</span>
                </p>
              </>
            ) : (
              'Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.'
            )}
          </p>
        </div>

        {/* Status Badge */}
        <div className='text-center mb-6'>
          <Badge
            className={`text-sm px-4 py-2 ${
              isSuccess ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
            }`}
          >
            {isSuccess ? 'Đã thanh toán' : 'Thanh toán thất bại'}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className='space-y-3'>
          {isSuccess ? (
            <>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                <Button variant='outline' className='py-3'>
                  <Home className='h-4 w-4 mr-2' />
                  Về trang chủ
                </Button>
                <Button variant='outline' className='py-3'>
                  <ShoppingBag className='h-4 w-4 mr-2' />
                  Tiếp tục đặt hàng
                </Button>

                <Button
                  className='w-full bg-primary hover:bg-primary/90 text-white py-3'
                  // onClick={() => router.push(`/orders/${paymentData.orderId}`)}
                >
                  Xem chi tiết đơn hàng
                  <ArrowRight className='h-4 w-4' />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className='flex items-center justify-center'>
                <Button variant='outline' className='py-3 w-50'>
                  <Home className='h-4 w-4 mr-2' />
                  Về trang chủ
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Additional Info */}
        <Card className='mt-6 border-none shadow-sm bg-foreground'>
          <CardContent className='p-0 text-center'>
            <p className='text-lg text-white'>
              {isSuccess ? (
                <span className=' font-bold'>Cảm ơn bạn đã tin tưởng Tấm Tắc!</span>
              ) : (
                <>
                  Nếu bạn cần hỗ trợ, vui lòng liên hệ:
                  <br />
                  <span className='text-secondary font-bold'>1900 1234</span>
                </>
              )}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className='min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center'>
          <div className='text-center'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4'></div>
            <p className='text-muted-foreground'>Đang tải kết quả thanh toán...</p>
          </div>
        </div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
