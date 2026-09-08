import AdminSessionGuard from "@/components/admin/AdminSessionGuard";

export default function AdminLayout({ children }) {
    return (
        <AdminSessionGuard>
            {children}
        </AdminSessionGuard>
    );
}