-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2021. Dec 10. 23:41
-- Kiszolgáló verziója: 10.4.20-MariaDB
-- PHP verzió: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `214szft_autokolcsonzo`
--
CREATE DATABASE IF NOT EXISTS `214szft_autokolcsonzo` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `214szft_autokolcsonzo`;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `egyenleg`
--

CREATE TABLE `egyenleg` (
  `id` int(11) NOT NULL,
  `datum` datetime NOT NULL,
  `osszeg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `Id` int(11) NOT NULL,
  `nev` text COLLATE utf8_hungarian_ci NOT NULL,
  `email` text COLLATE utf8_hungarian_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`Id`, `nev`, `email`, `jelszo`) VALUES
(1, 'Erik', 'erik@erik.hu', '5f5ea3800d9a62bc5a008759dbbece9cad5db58f');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `gepjarmuvek`
--

CREATE TABLE `gepjarmuvek` (
  `id` int(11) NOT NULL,
  `gyarto` text COLLATE utf8_hungarian_ci NOT NULL,
  `tipus` text COLLATE utf8_hungarian_ci NOT NULL,
  `kmoraallas` double NOT NULL,
  `szerviz_dij` int(11) NOT NULL,
  `napi_dij` int(11) NOT NULL,
  `kmdij` int(11) NOT NULL,
  `szerviz_km` int(11) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kolcsonzesek`
--

CREATE TABLE `kolcsonzesek` (
  `id` int(11) NOT NULL,
  `ugyfel_id` int(11) NOT NULL,
  `gepjarmu_id` int(11) NOT NULL,
  `felhaszn_id` int(11) NOT NULL,
  `kiad_datum` datetime NOT NULL,
  `visszahoz_datum` datetime DEFAULT NULL,
  `km_ora_kezd` double NOT NULL,
  `km_ora_veg` double DEFAULT NULL,
  `napszam` int(11) DEFAULT NULL,
  `ossz_km` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ugyfelek`
--

CREATE TABLE `ugyfelek` (
  `id` int(11) NOT NULL,
  `nev` text COLLATE utf8_hungarian_ci NOT NULL,
  `szig` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `lakcim` text COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `ugyfelek`
--

INSERT INTO `ugyfelek` (`id`, `nev`, `szig`, `lakcim`) VALUES
(3, 'Gábor', '123', 'Baja'),
(4, 'Béla', '456', 'Szeged'),
(5, 'Emese', '789', 'Pest'),
(6, 'Karcsi', '147', 'Pécs'),
(7, 'Máté', '333', 'Csávoly');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `egyenleg`
--
ALTER TABLE `egyenleg`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`Id`);

--
-- A tábla indexei `gepjarmuvek`
--
ALTER TABLE `gepjarmuvek`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ugyfel_id` (`ugyfel_id`),
  ADD KEY `gepjarmu_id` (`gepjarmu_id`),
  ADD KEY `felhaszn_id` (`felhaszn_id`);

--
-- A tábla indexei `ugyfelek`
--
ALTER TABLE `ugyfelek`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `egyenleg`
--
ALTER TABLE `egyenleg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT a táblához `gepjarmuvek`
--
ALTER TABLE `gepjarmuvek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `ugyfelek`
--
ALTER TABLE `ugyfelek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `kolcsonzesek`
--
ALTER TABLE `kolcsonzesek`
  ADD CONSTRAINT `kolcsonzesek_ibfk_1` FOREIGN KEY (`ugyfel_id`) REFERENCES `ugyfelek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kolcsonzesek_ibfk_2` FOREIGN KEY (`gepjarmu_id`) REFERENCES `gepjarmuvek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kolcsonzesek_ibfk_3` FOREIGN KEY (`felhaszn_id`) REFERENCES `felhasznalo` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
