import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./index.css";

interface IProps {
  title: string;
  onChange: (text: string) => void;
  value: string;
}

const DialogComponent: React.FC<IProps> = ({ onChange, title, value }) => {
  const [text, setText] = React.useState(value);

  const handleSave = () => {
    onChange(text);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="Button violet">{title}</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="label">
              Label
            </label>
            <input
              className="Input"
              value={text}
              id="label"
              onChange={(e) => setText(e.target.value)}
              defaultValue="Label"
            />
          </fieldset>

          <div
            style={{
              display: "flex",
              marginTop: 25,
              justifyContent: "flex-end",
            }}
          >
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSave}>
                Save
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogComponent;
