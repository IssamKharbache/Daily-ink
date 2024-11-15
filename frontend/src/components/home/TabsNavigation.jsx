import React, { useState } from "react";

const TabsNavigation = ({
  routes,
  defaultHidden,
  defaultIndex = 0,
  children,
}) => {
  const [activeTab, setActiveTab] = useState(defaultIndex);
  return (
    <>
      <div className="relative mb-8 border-b bg-white border-grey flex flex-nowrap overflow-x-auto">
        <ul class="flex flex-wrap">
          {routes.map((route, i) => {
            return (
              <div key={i} class="me-2">
                <button
                  onClick={() => setActiveTab(i)}
                  href="#"
                  className={`p-4 px-5 capitalize transition font-normal ${
                    defaultHidden.includes(route) ? "md:hidden" : ""
                  }
                  ${
                    activeTab === i
                      ? "border-b-2 border-black  font-semibold"
                      : "text-dark-grey/80 hover:text-black"
                  }`}
                >
                  {route}
                </button>
              </div>
            );
          })}
        </ul>
      </div>
      {Array.isArray(children) ? children[activeTab] : children}
    </>
  );
};

export default TabsNavigation;
