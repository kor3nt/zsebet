-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 24 Mar 2024, 14:40
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
(1, 'kor3nt', 1000);

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
  `type` int(11) NOT NULL COMMENT '0 - kod zużyto\r\n1 - kod jednorazowy\r\n2 - kod dla wielu użytkowników',
  `showCode` int(11) NOT NULL COMMENT '0 - ukryto\r\n1 - pokazano'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `zsebet_game`
--

CREATE TABLE `zsebet_game` (
  `title` text COLLATE utf8_polish_ci NOT NULL
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
(1, 'kor3nt', '$2y$10$.py7saVJhWlqAqtb4I39F.yw9ZjidiX7Q9Yrd4xJzSoaBXgs0UaiO', 'Klaudiusz', 'Jędrzejczyk', 'klaudiusz.jedrzejczyk@zse.krakow.pl', 1, '386822', 'admin', '28f591a8f29f4fc0330d5c56b6262fb8');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT dla tabeli `zsebet_bet`
--
ALTER TABLE `zsebet_bet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zsebet_match`
--
ALTER TABLE `zsebet_match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `zsebet_users`
--
ALTER TABLE `zsebet_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
