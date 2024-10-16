import React, { ErrorInfo } from "react";

// Định nghĩa kiểu cho props của ErrorBoundary
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

// Định nghĩa kiểu cho state của ErrorBoundary
interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Cập nhật state để hiển thị fallback UI
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Bạn có thể ghi log lỗi vào một dịch vụ ghi log
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Bạn có thể hiển thị bất kỳ UI nào tùy ý khi có lỗi
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
