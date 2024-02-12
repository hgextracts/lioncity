import TokenCard from "./StakingPartnerCard";

const Staking = () => {
  return (
    <div className="flex flex-col items-center p-6 text-center">
      <div className="flex flex-col font-extrabold justify-center rounded-md p-4 mb-6">
        <h1 className="text-4xl mb-4">Staking Partners</h1>
        <h2 className="text-2xl">$Mane Policy ID:</h2>
        <p className="mb-4">
          a90d1702625ee4ebcee3b3649
          <br />
          708cbcbb163f50db9663308acc9650e
        </p>
        <a
          className="button mb-4"
          href="https://cardanoscan.io/token/a90d1702625ee4ebcee3b3649708cbcbb163f50db9663308acc9650e4d414e45"
        >
          Cardano Scan
        </a>
        <a
          className="button"
          href="https://www.taptools.io/charts/token?pairID=0be55d262b29f564998ff81efe21bdc0022621c12f15af08d0f2ddb1.afa3e6b9372a4fe9151f7b4b101ac114e42af8e970d55cfbbd4185cdd6de1936"
        >
          Taptools
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <TokenCard
          imageUrl="/manetoken.png"
          altText="$Mane"
          title="$Mane"
          descriptions={["Mutants", "Staking Service"]}
          linkText="Earn $Mane"
          linkUrl="https://labs.mutant-nft.com/projects/luckylions?tab=staking"
        />
        <TokenCard
          imageUrl="/HEXO.png"
          altText="$Hexo"
          title="$Hexo"
          descriptions={["Cardano", "Lands"]}
          linkText="Earn $Hexo"
          linkUrl="https://cardanolands.com/"
        />
        <TokenCard
          imageUrl="/soc.png"
          altText="$Soc"
          title="$Soc"
          descriptions={["Ape Society", "Cabins"]}
          linkText="Earn $Soc"
          linkUrl="https://city.theapesociety.io/"
        />
        <TokenCard
          imageUrl="/ccctoken.png"
          altText="$C4"
          title="$C4"
          descriptions={["Mutants", "Staking Service"]}
          linkText="Earn $C4"
          linkUrl="https://swamplands.cardanocrocsclub.com/"
        />
      </div>
    </div>
  );
};

export default Staking;
