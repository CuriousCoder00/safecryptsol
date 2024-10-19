import CreateWallet from "@/components/create-wallet";

type Props = {};
const CreateWalletPage = ({ }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center max-w-screen min-h-screen gap-6">
      <CreateWallet />
    </div>
  );
};
export default CreateWalletPage;