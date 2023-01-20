import { Checkbox } from "src/components/Checkbox";
import styles from "./List.module.scss";

export interface TransferListListItem {
  id: number;
  label: string;
  checked: boolean;
}
interface TransferListListProps {
  items: TransferListListItem[];
  onItemToggle: (id: number) => void;
}

export function TransferListList({
  items,
  onItemToggle,
}: TransferListListProps) {
  return (
    <ul className={styles.list}>
      {items.map(({ id, label, checked }) => (
        <li className={styles.item} key={id}>
          <Checkbox
            label={label}
            onChange={() => onItemToggle(id)}
            checked={checked}
          />
        </li>
      ))}
    </ul>
  );
}
export default TransferListList;
