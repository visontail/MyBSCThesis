-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 12, 2023 at 07:48 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BSCthesis`
--

-- --------------------------------------------------------

--
-- Table structure for table `Measurement`
--

CREATE TABLE `Measurement` (
  `ID_measure` int(11) NOT NULL,
  `ID_station_num` int(11) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `direction` int(11) DEFAULT NULL,
  `meas_intervall` int(11) NOT NULL,
  `traff_other` int(11) DEFAULT NULL,
  `traff_pedestrian` int(11) DEFAULT NULL,
  `traff_cyclist` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Measurement`
--


-- --------------------------------------------------------

--
-- Table structure for table `Station`
--

CREATE TABLE `Station` (
  `ID_station_num` int(11) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `measuring_inst` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Station`
--

INSERT INTO `Station` (`ID_station_num`, `city`, `measuring_inst`) VALUES
(113006, 'Törökbálint', 'MXV2018011'),
(120003, 'Kaposvár', 'MXV2018047');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Measurement`
--
ALTER TABLE `Measurement`
  ADD PRIMARY KEY (`ID_measure`),
  ADD KEY `Station_Num` (`ID_station_num`);

--
-- Indexes for table `Station`
--
ALTER TABLE `Station`
  ADD PRIMARY KEY (`ID_station_num`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Measurement`
--
ALTER TABLE `Measurement`
  MODIFY `ID_measure` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Measurement`
--
ALTER TABLE `Measurement`
  ADD CONSTRAINT `Station_Num` FOREIGN KEY (`ID_station_num`) REFERENCES `Station` (`ID_station_num`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
