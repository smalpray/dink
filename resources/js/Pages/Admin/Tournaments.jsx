import AdminLayout from '@/app/admin/layout/AdminLayout';
import AdminSectionPage from '@/app/admin/pages/AdminSectionPage';

function Page() {
    return <AdminSectionPage section="tournaments" />;
}

Page.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Page;
