import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext"; // Senin AuthContext'ine göre ayarla

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    // Giriş yapılmamışsa login sayfasına yönlendir
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
