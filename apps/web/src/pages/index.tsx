import CardInput from "@stery-ui/react/card-input";
import Datepicker from "@stery-ui/react/datepicker";
import React from "react";

export default function Web() {
  return (
    <div>
      <h1>Web</h1>
      {/* <Datepicker.Input ref={inputRef} className="asdf" /> */}
      <Datepicker>
        {({ open }) => (
          <>
            <Datepicker.Input className="px-2 py-1 border rounded" />
            <Datepicker.Toggle
              className={({ open }) => (open ? "bg-red-200" : "bg-blue-400")}
            >
              {({ open }) => {
                return open ? "Close" : "Open";
              }}
            </Datepicker.Toggle>
            <Datepicker.Panel className="p-4 rounded border">
              <Datepicker.Current>
                {({ title }) => <div>{title}</div>}
              </Datepicker.Current>
            </Datepicker.Panel>
          </>
        )}
      </Datepicker>

      <div className="pt-16">
        <CardInput
          onChange={(card) => {
            console.log(card);
          }}
        >
          <div className="max-w-md w-full">
            <div className="relative">
              <div className="absolute top-0 pr-2 right-0 bottom-0 flex items-center justify-center h-full">
                <CardInput.CardImage className="object-contain flex flex-col items-start justify-start content-start" />
              </div>
              <CardInput.CardNumber className="pl-4 py-2 border rounded-md invalid:border-red-900 pr-12 w-full" placeholder="1234 1234 1234 1234" />
            </div>
            <div className="mt-4 flex flex-row flex-wrap">
              <div className="w-1/2 pr-2">
                <CardInput.CardExpiry className="px-4 py-2 border text-center rounded-md w-full" placeholder="MM/YY" />
              </div>
              <div className="w-1/2 pl-2">
                <CardInput.CardCvc className="px-4 py-2 border text-center rounded-md w-full" placeholder="123" />
              </div>
            </div>
          </div>
        </CardInput>
      </div>
    </div>
  );
}
