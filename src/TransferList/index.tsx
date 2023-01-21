import { useState } from "react";
import Button from "src/components/Button";
import TransferListActionBtn from "src/TransferList/components/ActionButton";
import TransferListList, {
  TransferListListItem,
} from "src/TransferList/components/List";
import styles from "./TransferList.module.scss";

const DEFAULT_ITEMS: TransferListListItem[] = [
  "JS",
  "HTML",
  "CSS",
  "TS",
  "React",
  "Angular",
  "Vue",
  "Svetle",
].map((item, index) => ({ id: index, label: item, checked: false }));

export function TransferList() {
  const [items, setItems] = useState<TransferListListItem[][]>([
    DEFAULT_ITEMS.slice(0, DEFAULT_ITEMS.length / 2),
    DEFAULT_ITEMS.slice(DEFAULT_ITEMS.length / 2),
  ]);

  const isAnyItemChecked = (index: number) =>
    items[index].some(({ checked }) => checked);
  const isListEmpty = (index: number) => items[index].length === 0;

  function handleToggleList(id: number, index: number) {
    const stateItemsCopy = [...items];

    for (let i = 0; i < items[index].length; i++) {
      const item = items[index][i];

      if (item.id === id) {
        stateItemsCopy[index][i].checked = !item.checked;
        setItems(stateItemsCopy);
        break;
      }
    }
  }

  function handleTransfer(
    source: number,
    destination: number,
    transferAll = false
  ) {
    const stateItemsCopy = [...items];

    if (transferAll) {
      stateItemsCopy[source] = [];
      stateItemsCopy[destination] = DEFAULT_ITEMS;
    } else {
      const stateItemsSourceCopy = [...stateItemsCopy[source]];
      stateItemsCopy[source] = stateItemsCopy[source].filter(
        ({ checked }) => !checked
      );
      stateItemsCopy[destination] = stateItemsCopy[destination].concat(
        stateItemsSourceCopy.filter(({ checked }) => checked)
      );
    }
    setItems(
      stateItemsCopy.map((items) =>
        items.map((item) => ({ ...item, checked: false }))
      )
    );
  }

  return (
    <div className={styles.container}>
      <TransferListList
        items={items[0]}
        onItemToggle={(id) => handleToggleList(id, 0)}
      />
      <div className={styles.actions}>
        <TransferListActionBtn
          disabled={isListEmpty(1)}
          onClick={() => handleTransfer(1, 0, true)}
          src="/svgs/expand-left-double.svg"
          title="Move all"
          alt="Move all to first list"
        />
        <TransferListActionBtn
          disabled={!isAnyItemChecked(1)}
          onClick={() => handleTransfer(1, 0, false)}
          src="/svgs/expand-left.svg"
          title="Move all"
          alt="Move selected to first list"
        />
        <TransferListActionBtn
          disabled={!isAnyItemChecked(0)}
          onClick={() => handleTransfer(0, 1, false)}
          src="/svgs/expand-right.svg"
          title="Move all"
          alt="Move selected to second list"
        />
        <TransferListActionBtn
          disabled={isListEmpty(0)}
          onClick={() => handleTransfer(0, 1, true)}
          src="/svgs/expand-right-double.svg"
          title="Move all"
          alt="Move all to second list"
        />
      </div>
      <TransferListList
        items={items[1]}
        onItemToggle={(id) => handleToggleList(id, 1)}
      />
    </div>
  );
}
export default TransferList;
