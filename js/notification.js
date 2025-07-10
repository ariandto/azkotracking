function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === 'success' ? 'rgba(76, 175, 80, 0.9)' :
                  type === 'error' ? 'rgba(244, 67, 54, 0.9)' :
                  'rgba(255, 193, 7, 0.9)'};
      color: white;
      border-radius: 10px;
      backdrop-filter: blur(10px);
      z-index: 9999;
      font-weight: 500;
      animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
  
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out forwards';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
  
  // Tambahkan animasi ke <head> saat file dimuat
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  
    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  