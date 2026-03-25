import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {
    this.crateToastContainer();
  }
  private crateToastContainer() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast toast-bottom toast-end z-50';
      document.body.appendChild(container);
    }
  }

  createToastElement(message: string, className: string, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.classList.add(
      'alert',
      className,
      'shadow-lg',
      'flex',
      'items-center',
      'gap-3',
      'cursor-pointer',
    );
    toast.innerHTML = `
    <span>${message}</span>
    <button class="btn btn-ghost btn-sm ml-4">x</button>
    `;

    toast.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toast);
    });

    toastContainer.append(toast);
    setTimeout(() => {
      if (toastContainer.contains(toast)) {
        toastContainer.removeChild(toast);
      }
    }, duration);
  }

  success(message: string, duration?: number) {
    this.createToastElement(message, 'alert-success');
  }

  error(message: string, duration?: number) {
    this.createToastElement(message, 'alert-error');
  }

  warning(message: string, duration?: number) {
    this.createToastElement(message, 'alert-warning');
  }

  info(message: string, duration?: number) {
    this.createToastElement(message, 'alert-info');
  }
}
