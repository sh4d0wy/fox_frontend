import { Dialog, DialogPanel } from "@headlessui/react";
import { useState } from "react";
import InputSwitch from "../ui/Switch";

interface NotificationsModelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationsModel({
  isOpen,
  onClose,
}: NotificationsModelProps) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [soundNotif, setSoundNotif] = useState(true);

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none bg-black/80"
      onClose={onClose}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/80">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-[446px] pb-10 rounded-xl bg-white backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <div className="flex items-center justify-between gap-6 border-b border-gray-1400 px-[22px] pt-6 pb-4 mb-6">
              <h4 className="text-lg text-black-1000 font-semibold font-inter">
                Notifications
              </h4>
              <button
                onClick={onClose}
                className="flex items-center justify-center cursor-pointer hover:scale-110 transition duration-300"
              >
                <img src="/icons/cross-icon.svg" alt="cross" />
              </button>
            </div>

            <div className="w-full px-5">
              <p className="text-sm text-black-1000 font-inter mb-10">
                Manage how you want to receive alerts and notifications.
              </p>

              <div className="space-y-6">

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h4 className="lg:text-base text-sm font-semibold font-inter text-black-1000">
                      Email Notifications
                    </h4>
                    <p className="sm:text-sm text-xs text-gray-1200 font-inter">
                      Receive updates directly through email.
                    </p>
                  </div>
                  <InputSwitch checked={emailNotif} onChange={setEmailNotif} />
                </div>

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h4 className="lg:text-base text-sm font-semibold font-inter text-black-1000">
                      Push Notifications
                    </h4>
                    <p className="sm:text-sm text-xs text-gray-1200 font-inter">
                      Get instant push alerts in your browser or device.
                    </p>
                  </div>
                  <InputSwitch checked={pushNotif} onChange={setPushNotif} />
                </div>

                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h4 className="lg:text-base text-sm font-semibold font-inter text-black-1000">
                      Sound Alerts
                    </h4>
                    <p className="sm:text-sm text-xs text-gray-1200 font-inter">
                      Play a sound when a new notification arrives.
                    </p>
                  </div>
                  <InputSwitch checked={soundNotif} onChange={setSoundNotif} />
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
