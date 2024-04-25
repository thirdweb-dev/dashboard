import { useEngineConnectedInstance } from "@3rdweb-sdk/react/hooks/useEngine";
import { useLoggedInUser } from "@3rdweb-sdk/react/hooks/useLoggedInUser";
import { AppLayout } from "components/app-layouts/app";
import { EngineInstancesList } from "components/engine/engine-list";
import { EngineNoConnectedWallet } from "components/engine/no-connected-wallet";
import { EngineSidebar } from "core-ui/sidebar/engine";
import { PageId } from "page-id";
import { ThirdwebNextPage } from "utils/types";

const EngineManage: ThirdwebNextPage = () => {
  const { isLoggedIn } = useLoggedInUser();
  const { instance, setInstance } = useEngineConnectedInstance();

  if (!isLoggedIn) {
    return <EngineNoConnectedWallet />;
  }

  return <EngineInstancesList setConnectedInstance={setInstance} />;
};

EngineManage.getLayout = (page, props) => (
  <AppLayout {...props} hasSidebar={true}>
    <EngineSidebar activePage="manage" />
    {page}
  </AppLayout>
);

EngineManage.pageId = PageId.EngineManage;

export default EngineManage;
