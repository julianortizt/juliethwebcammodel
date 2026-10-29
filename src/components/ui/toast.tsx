import { Toaster as HotToaster } from 'react-hot-toast'

export function ToastContainer() {
  return (
    <HotToaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(20, 10, 30, 0.95)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: 'white',
          borderRadius: '16px',
          padding: '14px 20px',
        },
        success: {
          iconTheme: {
            primary: '#f472b6',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#f87171',
            secondary: '#fff',
          },
        },
      }}
    />
  )
}
