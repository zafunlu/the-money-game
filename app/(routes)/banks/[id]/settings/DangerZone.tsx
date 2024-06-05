"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { DELETE } from "@/app/utils/http-client";
import { Dialog } from "@/app/components/dialog/Dialog";
import { MatIcon } from "@/app/components/icons/MatIcon";
import { dialogsAction } from "@/lib/features/dialogs/dialogsSlice";
import { fetchBanks } from "@/lib/features/banks/banksSlice";
import { useRouter } from "next/navigation";
import { useSnackbar } from "@/app/components/snackbar/snackbar-context";

type DangerZoneProps = { bank: any };

export function DangerZone({ bank }: DangerZoneProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackbar } = useSnackbar();
  const isDialogOpen = useAppSelector<any>((state) => state.dialogs.deleteBank);

  function openDeleteBankDialog(): void {
    dispatch(dialogsAction.openDeleteBank());
  }

  async function deleteBank(): Promise<void> {
    try {
      const response = await DELETE(`/banks/${bank.id}`);

      if (response.ok) {
        showSnackbar(`Successfully deleted ${bank.name}`);
        router.push("/dashboard");
        closeDialog();
        dispatch(fetchBanks());
      } else {
        const { message } = await response.json();
        showSnackbar(message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function closeDialog(): void {
    dispatch(dialogsAction.closeDeleteBank());
  }

  return (
    <>
      <section
        id="Danger_Section"
        className="flex flex-col gap-2 rounded-[20px] bg-tertiary py-3 px-4"
      >
        <div>
          <h1>Danger Zone</h1>
          Alles wat je in deze sectie doet, kan niet ongedaan worden gemaakt.
          Zorg ervoor dat je weet wat je doet.
        </div>
        <div>
          <button
            onClick={openDeleteBankDialog}
            className="common filled-error sm"
          >
            Klas verwijderen
          </button>
        </div>
      </section>
      {isDialogOpen && (
        <Dialog>
          <header>
            <MatIcon icon="delete-outline" />
            <h1>Klas verwijderen?</h1>
          </header>
          <main className="flex flex-col gap-3">
            <p>
              Het verwijderen van deze bank zal <strong>permanent</strong> alle
              bijbehorende gegevens verwijderen. Dit omvat klanten en
              transacties.
            </p>
            <p>Weet je zeker dat je {bank.name} wilt verwijderen?</p>
          </main>
          <footer>
            <button className="common ghost" onClick={closeDialog}>
              Annuleren
            </button>
            <button className="common ghost" onClick={deleteBank}>
              Klas verwijderen
            </button>
          </footer>
        </Dialog>
      )}
    </>
  );
}
