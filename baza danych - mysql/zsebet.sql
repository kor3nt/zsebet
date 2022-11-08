-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 08 Lis 2022, 22:57
-- Wersja serwera: 10.4.21-MariaDB
-- Wersja PHP: 8.0.10

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
(1, 'kor3nt', 4740),
(2, 'kor3nt1', 10001),
(3, 'kor3nt2', 123123),
(4, 'kor3nt12', 1000123);

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
-- Struktura tabeli dla tabeli `zsebet_codes`
--

CREATE TABLE `zsebet_codes` (
  `code` text COLLATE utf8_polish_ci NOT NULL,
  `value` int(11) NOT NULL,
  `type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_game`
--

CREATE TABLE `zsebet_game` (
  `title` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zsebet_game`
--

INSERT INTO `zsebet_game` (`title`) VALUES
('Counter-Strike: Global Offensive'),
('Dirt 4'),
('League of Legends');

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
(1, 'FFC - XD', 'FFC', 'FFC', 6, 1201, 'XD', 'XD', 1.1, 10001, 'Counter-Strike: Global Offensive', NULL, '2022-10-05 22:10:50', 0),
(22, 'Fasola Funclub - Mieszanka', 'Fasola Funclub', 'FFC', 1.1, 15001, 'Mieszanka', 'XD', 10001, 1, 'League of Legends', NULL, '2022-10-05 20:10:50', 0),
(23, 'Wyścig Tomek', 'Przegra', 'lostTomek', 2, 1, 'Wygra', 'winTomek', 2, 1, 'Dirt 4', NULL, '2022-11-08 23:09:00', 0);

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
  `verify` int(11) NOT NULL COMMENT '0 - niezweryfikowany\r\n1 - zweryfikowany',
  `otp` text COLLATE utf8_polish_ci NOT NULL,
  `role` text COLLATE utf8_polish_ci NOT NULL,
  `token` text COLLATE utf8_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

--
-- Zrzut danych tabeli `zsebet_users`
--

INSERT INTO `zsebet_users` (`id`, `nick`, `password`, `name`, `surname`, `email`, `verify`, `otp`, `role`, `token`) VALUES
(1, 'kor3nt', '$2y$10$oXJglUapst3mFN47LeDSVeX5OEJDKblAI8hVSfyJF6dQWjVahGoM6', 'Klaudiusz', 'Jędrzejczyk', 'klaudiusz.jedrzejczyk@zse.krakow.pl', 1, '170507', 'admin', '9e38493594870ac5b32a3fddc7ae5f07');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_uses`
--

CREATE TABLE `zsebet_uses` (
  `nick` text COLLATE utf8_polish_ci NOT NULL,
  `code` text COLLATE utf8_polish_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

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
-- Indeksy dla tabeli `zsebet_codes`
--
ALTER TABLE `zsebet_codes`
  ADD PRIMARY KEY (`code`(10));

--
-- Indeksy dla tabeli `zsebet_game`
--
ALTER TABLE `zsebet_game`
  ADD PRIMARY KEY (`title`(45));

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zsebet_match`
--
ALTER TABLE `zsebet_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT dla tabeli `zsebet_users`
--
ALTER TABLE `zsebet_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
