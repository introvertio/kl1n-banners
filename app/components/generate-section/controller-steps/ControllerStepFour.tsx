import { db } from "@/lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import Spinner from "../../loaders/Spinner";
import GradientAngleSelector from "../selectors/GradientAngleSelector";

export default function ControllerStepFour() {
  const data = useLiveQuery(() => db.banner.get(1), []);

  const handleChange = async (
    key: string,
    value: string | number | boolean | string[] | null
  ) => {
    if (data) {
      await db.banner.put({
        ...data,
        background: {
          ...data.background,
          [key]: value,
        },
      });
    }
  };

  if (!data) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  const { background } = data;

  return (
    <div className=" w-[344px] flex flex-col items-center justify-center rounded p-2 shadow">
      <div className="flex flex-col gap-1 w-full">
        <p className="p-1 w-full text-center bg-main-blue text-white text-lg md:text-xl font-semibold rounded">
          Background
        </p>
        <div className="flex flex-row items-center justify-between w-full">
          <button
            onClick={() => handleChange("useGradient", false)}
            className={`${
              background.useGradient
                ? `bg-white text-black`
                : `bg-main-blue text-white`
            } h-9 w-36 rounded shadow transition-all active:scale-95 text-sm font-medium`}
          >
            Solid Color
          </button>{" "}
          <small className="text-xs font-medium text-main-blue mx-auto">{`or`}</small>
          <button
            onClick={() => handleChange("useGradient", true)}
            className={`${
              !background.useGradient
                ? `bg-white text-black`
                : `bg-main-blue text-white`
            } h-9 w-36 rounded shadow transition-all active:scale-95 text-sm font-medium`}
          >
            Gradient
          </button>
        </div>
        <div className="w-full h-fit flex flex-col gap-1">
          {!background.useGradient ? (
            <>
              <p className="text-black font-medium text-xs mr-auto">Color</p>
              <input
                className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
                type="color"
                value={background.color}
                onChange={(e) => handleChange("color", e.target.value)}
              />
            </>
          ) : (
            <div className="w-full flex flex-col gap-1">
              <>
                <p className="text-black font-medium text-xs mr-auto">
                  Start Color
                </p>
                <input
                  className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
                  type="color"
                  value={background.gradientStart}
                  onChange={(e) =>
                    handleChange("gradientStart", e.target.value)
                  }
                />
              </>

              {background.gradientMiddle === null ? (
                <button
                  onClick={() => handleChange("gradientMiddle", "#ffffff")}
                  className="h-10 w-full rounded shadow transition-all active:scale-95 text-xs font-medium bg-main-blue text-white"
                >
                  Add Middle Color
                </button>
              ) : (
                <>
                  <p className="text-black font-medium text-xs mr-auto">
                    Middle Color
                  </p>
                  <input
                    className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
                    type="color"
                    value={background.gradientMiddle}
                    onChange={(e) =>
                      handleChange("gradientMiddle", e.target.value)
                    }
                  />
                </>
              )}
              <>
                <p className="text-black font-medium text-xs mr-auto">
                  End Color
                </p>
                <input
                  className="w-full h-10 outline-none rounded active:scale-95 transition-all shadow "
                  type="color"
                  value={background.gradientEnd}
                  onChange={(e) => handleChange("gradientEnd", e.target.value)}
                />
              </>
            </div>
          )}
          <GradientAngleSelector
            value={background.gradientAngle}
            onChange={(value) => handleChange("gradientAngle", value)}
          />
        </div>
      </div>
    </div>
  );
}
