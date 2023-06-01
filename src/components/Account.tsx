import {
  AbsoluteCenter,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import Profile from "./Forms/Profile";
import ChangePassword from "./Forms/ChangePassword";

const Account = () => {
  return (
    <AbsoluteCenter>
      <Tabs>
        <TabList>
          <Tab>Profile</Tab>
          <Tab>Change Password</Tab>
          <Tab>Change Email</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Profile />
          </TabPanel>
          <TabPanel>
            <ChangePassword />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AbsoluteCenter>
  );
};

export default Account;
