-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 29 Paź 2022, 10:48
-- Wersja serwera: 10.4.17-MariaDB
-- Wersja PHP: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `zsebet`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_amount`
--

CREATE TABLE `zsebet_amount` (
  `id` int(11) NOT NULL,
  `nick` text COLLATE utf8_polish_ci NOT NULL,
  `coins` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zsebet_amount`
--

INSERT INTO `zsebet_amount` (`id`, `nick`, `coins`) VALUES
(2, 'kor3nt1', 10001),
(3, 'kor3nt2', 123123),
(4, 'kor3nt12', 1000123),
(5, 'kor3nt', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_bet`
--

CREATE TABLE `zsebet_bet` (
  `id` int(11) NOT NULL,
  `nick` text COLLATE utf8_polish_ci NOT NULL,
  `team` text COLLATE utf8_polish_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `multiple` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_match`
--

CREATE TABLE `zsebet_match` (
  `id` int(11) NOT NULL,
  `LabelMatch` text COLLATE utf8_polish_ci NOT NULL,
  `TeamA` text COLLATE utf8_polish_ci NOT NULL,
  `TagTeamA` text COLLATE utf8_polish_ci NOT NULL,
  `multipleTeamA` float NOT NULL,
  `costTeamA` int(11) NOT NULL,
  `TeamB` text COLLATE utf8_polish_ci NOT NULL,
  `TagTeamB` text COLLATE utf8_polish_ci NOT NULL,
  `multipleTeamB` float NOT NULL,
  `costTeamB` int(11) NOT NULL,
  `game` text COLLATE utf8_polish_ci NOT NULL,
  `winner` text COLLATE utf8_polish_ci DEFAULT NULL,
  `date` datetime NOT NULL,
  `block` int(11) NOT NULL COMMENT '0 - można obstawiać\r\n1 - zablokowany mecz'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zsebet_match`
--

INSERT INTO `zsebet_match` (`id`, `LabelMatch`, `TeamA`, `TagTeamA`, `multipleTeamA`, `costTeamA`, `TeamB`, `TagTeamB`, `multipleTeamB`, `costTeamB`, `game`, `winner`, `date`, `block`) VALUES
(1, 'FFC - XD', 'FFC', 'FFC', 1.5, 1, 'XD', 'XD', 1.5, 1, 'Counter Strike Global Offensive', NULL, '2022-10-05 22:10:50', 0),
(22, 'Fasola Funclub - Mieszanka', 'Fasola Funclub', 'FFC', 1.5, 1, 'Mieszanka', 'XD', 1.5, 1, 'Counter Strike Global Offensive', NULL, '2022-10-05 20:10:50', 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_users`
--

CREATE TABLE `zsebet_users` (
  `id` int(11) NOT NULL,
  `nick` text COLLATE utf8_polish_ci NOT NULL,
  `password` text COLLATE utf8_polish_ci NOT NULL,
  `name` text COLLATE utf8_polish_ci NOT NULL,
  `surname` text COLLATE utf8_polish_ci NOT NULL,
  `email` text COLLATE utf8_polish_ci NOT NULL,
  `verify` int(11) NOT NULL COMMENT '0 - niezweryfikowany\r\n1 - zweryfikowany\r\n2 - zablokowany',
  `otp` text COLLATE utf8_polish_ci NOT NULL,
  `role` text COLLATE utf8_polish_ci NOT NULL,
  `token` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zsebet_users`
--

INSERT INTO `zsebet_users` (`id`, `nick`, `password`, `name`, `surname`, `email`, `verify`, `otp`, `role`, `token`) VALUES
(2, 'kor3nt', '$2y$10$oXJglUapst3mFN47LeDSVeX5OEJDKblAI8hVSfyJF6dQWjVahGoM6', 'Klaudiusz', 'Jędrzejczyk', 'klaudiusz.jedrzejczyk@zse.krakow.pl', 1, '170507', 'admin', '9e38493594870ac5b32a3fddc7ae5f07');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `zsebet_amount`
--
ALTER TABLE `zsebet_amount`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zsebet_bet`
--
ALTER TABLE `zsebet_bet`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zsebet_match`
--
ALTER TABLE `zsebet_match`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `zsebet_users`
--
ALTER TABLE `zsebet_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `zsebet_amount`
--
ALTER TABLE `zsebet_amount`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `zsebet_bet`
--
ALTER TABLE `zsebet_bet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `zsebet_match`
--
ALTER TABLE `zsebet_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT dla tabeli `zsebet_users`
--
ALTER TABLE `zsebet_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
