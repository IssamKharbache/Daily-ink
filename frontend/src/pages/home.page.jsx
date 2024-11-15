import React from "react";
import AnimationWrapper from "../common/page-animation";
import TabsNavigation from "../components/home/TabsNavigation";

const HomePage = () => {
  return (
    <AnimationWrapper className="h-cover flex justify-center gap-10 max-w-7xl mx-auto">
      {/* latest blogs */}
      <div className="w-full">
        <TabsNavigation
          routes={["home", "popular"]}
          defaultHidden={["popular"]}
        >
          <h1>Latest blogs</h1>
          <div className="">Popular blog here</div>
        </TabsNavigation>
      </div>
      {/* filters and trending blogs */}
    </AnimationWrapper>
  );
};

export default HomePage;
