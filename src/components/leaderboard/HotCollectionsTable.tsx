export const HotCollectionsTable = () => {

  const hotCollections = [
    { rank: "01", avatar: "/images/ranked-1.svg", user: "@mjbreese613" },
    { rank: "02", avatar: "/images/ranked-2.svg", user: "@ClarkOliiver" },
    { rank: "03", avatar: "/images/ranked-3.svg", user: "@ArtueroY" },
    { rank: "04", user: "@tanrikulu_onur" },
    { rank: "05", user: "@ShylockCapital" },
    { rank: "06", user: "@FYqc...Xad8" },
    { rank: "07", user: "@SwannyNFT" },
    { rank: "08", user: "@Anon666NFT" },
    { rank: "09", user: "@frostyxsol" },
    { rank: "10", user: "@OzzyyySOL" },
  ];

  return (
    <div className="border border-gray-1100 rounded-[20px] w-full overflow-hidden mt-7 xl:mt-[90px]">
      <div className="w-full py-6 px-6 bg-primary-color border-b border-gray-1100">
        <p className="md:text-xl text-lg text-center text-white font-inter font-semibold">
          Hot Collections (7d)
        </p>
      </div>

      <table className="table w-full">
        <thead className="bg-gray-1300">
          <tr>
            <th className="text-base text-start font-inter text-gray-1600 font-medium px-6 py-6">Rank</th>
            <th className="text-base w-3/4 text-start font-inter text-gray-1600 font-medium">
              <div className="pl-5 h-6 border-l border-gray-1600">User</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {hotCollections.map((item, index) => (
            <tr key={index} className="w-full">
              <td>
                <div className="px-8 flex items-center gap-2.5 h-20 border-b border-gray-1100">
                  {item.avatar ? (
                    <img src={item.avatar} className="w-8 h-8" alt="avatar" />
                  ) : (
                    <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{item.rank}</p>
                  )}
                </div>
              </td>

              <td>
                <div className="px-5 flex items-center gap-2.5 h-20 border-b border-gray-1100">
                  <p className="md:text-base text-sm text-black-1000 font-medium font-inter">{item.user}</p>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
