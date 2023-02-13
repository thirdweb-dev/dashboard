import { AppLayout } from "components/app-layouts/app";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const Dashboard: ThirdwebNextPage = () => {
  return <>hi</>;
};

Dashboard.getLayout = (page, props) => <AppLayout {...props}>{page}</AppLayout>;
Dashboard.pageId = PageId.Dashboard;

export default Dashboard;
