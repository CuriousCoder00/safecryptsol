import { Wallet as WalletType } from "@prisma/client";

type Props = {
 wallets?: WalletType[]
}
export const Wallet = ({wallets}: Props) => {
    return ( 
        <div className="flex items-start justify-start gap-2">
            Wallet
        </div>
    );
}