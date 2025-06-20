/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import HotTheGame from "@/components/HotTheGame";
import IntroducingTheGameTableGame from "@/components/IntroducingTheGameTableGame";
import gameName from "@/constant/gameName";
import useSupplierLogo from "@/hooks/useSupplierLogo";
import { IItemGame } from "@/interface/game.interface";
import styles from "@/styles/casino.module.css";
import { LoadingOutlined } from "@ant-design/icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input, Spin } from "antd";
import { useEffect, useState } from "react";

export default function ListGameOptions({}: {}) {
  const [dataRawSlot, setDataRawSlot] = useState<IItemGame[]>([]);
  const [dataFishingGame, setDataFishingGame] = useState([]);

  const [searchValue, setSearchValue] = useState("");
  const [activeItem, setActiveItem] = useState("hot");
  const [listGame, setListGame] = useState<IItemGame[]>([]);
  const [propSearchValue, setPropSearchValue] = useState("");
  const [loadingGame, setLoadingGame] = useState(false);

  const { banner, logo, bgInput, bgItem, bgTitle, navigatorBg, pagnigatorBg, colorTitle } =
    useSupplierLogo(gameName.FTGCARD);

  const getDataAvalible = async () => {
    // setLoadingGame(true);
    // try {
    //   const res = await gameService.GameAvalibleV2({
    //     gameTypes: [`${GameProviderGameType.TableGames}`],
    //     gpIds: [`${ListGameConfig.ftg}`],
    //   });
    //   if (res?.data?.data) {
    //     const uniqueArr =
    //       res?.data?.data.filter(
    //         (item: { gpId: any; gameName: any }, index: any, self: any[]) =>
    //           index ===
    //           self.findIndex(
    //             (t: { gpId: any; gameName: any }) =>
    //               t.gpId === item.gpId && t.gameName === item.gameName
    //           )
    //       ) || [];
    //     setDataRawSlot(uniqueArr);
    //   }
    // } catch (error) {
    // } finally {
    //   setLoadingGame(false);
    // }
  };

  const getDataBanCa = async () => {
    // setLoadingGame(true);
    // try {
    //   const res = await gameService.GameAvalibleV2({
    //     gameTypes: [`${GameProviderGameType.FishingGames}`],
    //     gpIds: [`${ListGameConfig.ftg}`],
    //   });
    //   if (res?.data?.data) {
    //     const sortItem =
    //       res?.data?.data.sort(
    //         (a: { rank: number }, b: { rank: number }) => a.rank - b.rank
    //       ) || [];
    //     const uniqueArr =
    //       sortItem.filter(
    //         (item: { gpId: any; gameName: any }, index: any, self: any[]) =>
    //           index ===
    //           self.findIndex(
    //             (t: { gpId: any; gameName: any }) =>
    //               t.gpId === item.gpId && t.gameName === item.gameName
    //           )
    //       ) || [];
    //     setDataFishingGame(uniqueArr);
    //   }
    // } catch (error) {
    // } finally {
    //   setLoadingGame(false);
    // }
  };

  useEffect(() => {
    getDataAvalible();
    getDataBanCa();
  }, []);

  useEffect(() => {
    switch (activeItem) {
      case "all":
        setListGame(dataRawSlot || []);
        break;

      case "new":
        const data = dataRawSlot.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        setListGame(data || []);
        break;

      case "banca":
        setListGame(dataFishingGame || []);
        break;

      default:
        const sortItem =
          dataRawSlot.sort((a: { rank: number }, b: { rank: number }) => a.rank - b.rank) || [];
        setListGame(sortItem || []);
        break;
    }
  }, [activeItem, dataRawSlot, dataFishingGame]);

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      setActiveItem("all");
      setPropSearchValue(searchValue);
    }
  };

  const onClickFilter = (value: string) => {
    setSearchValue("");
    setActiveItem(value);
  };

  return (
    <div
      className={`w-full flex flex-col items-center border-solid border-[1px] pb-[30px]  bg-white min-h-screen`}
      style={
        {
          // backgroundImage: bgUrl && `url(${bgUrl})`,
        }
      }
    >
      <div className="w-[850px] h-[80px] flex justify-between items-center">
        <div className="logo ">
          <img
            loading="lazy"
            src={logo}
            alt=""
          />
        </div>

        <div
          className="flex rounded p-1 items-center gap-1"
          style={{
            background: bgInput,
          }}
        >
          <Input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.customeInputSearch}
            placeholder="Vui lòng nhập tên trò chơi."
          />
          <FontAwesomeIcon
            icon={faSearch}
            fontSize={20}
            color="#fff"
            onClick={() => {
              setActiveItem("all");
              setPropSearchValue(searchValue);
            }}
            className="mx-2 text-white cursor-pointer"
          />
        </div>
      </div>
      <div
        className="mb-[20px] w-full flex justify-center content-center"
        style={{
          background: bgTitle,
        }}
      >
        <div className=" w-[850px] flex items-center flex-wrap py-[10px] gap-4 font-roHe">
          <p
            onClick={() => onClickFilter("hot")}
            className={`text-white ${
              activeItem !== "hot" ? `${styles[`ftg`]}` : `${styles[`ftgHover`]}`
            } text-[15px] h-[30px]  px-4 py-2 flex justify-center items-center rounded-full cursor-pointer`}
          >
            Trò Chơi Hot Nhất
          </p>

          <p
            onClick={() => onClickFilter("co")}
            className={`text-white text-[15px] h-[30px]  ${
              activeItem !== "co" ? `${styles[`ftg`]}` : `${styles[`ftgHover`]}`
            } px-4 py-2 flex justify-center items-center rounded-full cursor-pointer`}
          >
            Trò Chơi Cờ
          </p>
        </div>
      </div>

      {/* {banner && <img className="mb-4" src={banner} alt="" />} */}

      {activeItem === "hot" && <IntroducingTheGameTableGame gamename={gameName.FTGCARD} />}

      {activeItem === "hot" && listGame.length && (
        <div
          className={styles.gameHeadLine}
          style={{
            borderColor: colorTitle || bgTitle,
          }}
        >
          <span
            className="font-roHe"
            style={{
              backgroundColor: colorTitle || bgTitle,
            }}
          >
            Trò Chơi Hot Nhất
          </span>
        </div>
      )}

      {listGame.length && (
        <HotTheGame
          listGame={listGame}
          searchValue={propSearchValue}
          key="hotgame"
          gamename={gameName.FTGCARD}
        />
      )}

      {loadingGame && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-[999]">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 48, color: "#fff" }}
                spin
              />
            }
          />
        </div>
      )}
    </div>
  );
}
