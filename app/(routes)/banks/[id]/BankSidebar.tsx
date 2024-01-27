import { Card } from "@/app/components/card/Card";
import styles from "./BankSidebar.module.scss";
import { EmployeeList } from "./EmployeeList";
import { formatCurrency, formatDate } from "@/app/utils/formatters";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { useAppSelector } from "@/lib/hooks";
import { selectCustomers, selectTotalBankValue } from "@/lib/features/customers/customerSlice";

type BankSidebarProps = { bank: any };

export function BankSidebar({ bank }: BankSidebarProps) {
  const totalBankValue = useAppSelector(selectTotalBankValue);
  const customers = useAppSelector(selectCustomers);

  if (!bank) {
    return (
      <aside className={styles.bankSidebar}>
        <Card type="outlined">Loading...</Card>
      </aside>
    );
  }

  return (
    <aside className={styles.bankSidebar}>
      <Card type="outlined">
        <section>
          <h1 className="mb-2">Employees</h1>
          <EmployeeList />
        </section>
        <section className={styles.bankInfo}>
          <h1>Information</h1>
          <ul>
            <li>
              <MatIcon icon="groups-outline" />
              {customers.length}
            </li>
            <li>
              <MatIcon icon="paid-outline" />
              <span>{formatCurrency(totalBankValue)}</span>
            </li>
            <li>
              <MatIcon icon="calendar-month-outline" />
              {formatDate(bank.created_at, { month: "short" })}
            </li>
          </ul>
        </section>
      </Card>
    </aside>
  );
}
