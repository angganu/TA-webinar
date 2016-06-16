-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 03, 2016 at 12:27 PM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `webinar`
--

-- --------------------------------------------------------

--
-- Table structure for table `audience`
--

CREATE TABLE IF NOT EXISTS `audience` (
  `id_audience` int(12) NOT NULL,
  `id_seminar` int(12) NOT NULL,
  `id_user` int(12) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `audience`
--

INSERT INTO `audience` (`id_audience`, `id_seminar`, `id_user`, `status`) VALUES
(2, 13, 2, 0),
(4, 3, 2, 0),
(5, 5, 2, 0),
(7, 8, 2, 0),
(11, 7, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `seminar`
--

CREATE TABLE IF NOT EXISTS `seminar` (
  `id_seminar` int(12) NOT NULL,
  `judul` varchar(50) NOT NULL,
  `topik` varchar(50) NOT NULL,
  `deskripsi` text NOT NULL,
  `waktu` datetime NOT NULL,
  `opened` tinyint(1) NOT NULL,
  `key` varchar(25) NOT NULL,
  `penyelenggara` varchar(50) NOT NULL,
  `pembicara` text NOT NULL,
  `tgl_upload` datetime NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seminar`
--

INSERT INTO `seminar` (`id_seminar`, `judul`, `topik`, `deskripsi`, `waktu`, `opened`, `key`, `penyelenggara`, `pembicara`, `tgl_upload`, `status`) VALUES
(1, 'ini judulnya panjang looh sangat sangat panjang', 'topik 1', 'deskripsi blalalalblablaal', '2016-04-20 19:04:39', 1, '1461147756066', 'Tiens Syariah Bandung', 'dadang, udin, yusuf, kokom', '2016-04-20 17:22:36', 2),
(2, 'qqqqq', 'ddddd', 'asdasda', '2016-04-29 00:00:00', 0, '1461153798030', 'Tiens Syariah Bandung', 'dfgdfgdfgdfgdfg', '2016-04-20 19:03:18', 1),
(3, 'qqqq', 'www', 'eeee', '2016-04-20 19:04:39', 1, '1461153879401', 'Tiens Syariah Bandung', 'asdasdasd', '2016-04-20 19:04:39', 0),
(4, 'dodododo', 'tototototo', 'dededededed', '2016-04-28 19:04:39', 1, '1461165426052', 'Tiens Syariah Bandung', 'asdasd', '2016-04-20 22:17:06', 1),
(5, 'asdasdas', 'dddddd', 'sdfgdfgdfgd', '2016-04-27 19:04:39', 1, '1461165603726', 'Tiens Syariah Bandung', 'asdasdasd', '2016-04-20 22:20:04', 0),
(6, 'asdasd', 'asdasd', 'aasdas', '2016-04-26 19:04:39', 0, '1461166695918', 'Tiens Syariah Bandung', 'dasdasd', '2016-04-20 22:38:16', 0),
(7, 'asd', 'asd', 'asd', '2016-04-25 19:04:39', 1, '1461166791821', 'Tiens Syariah Bandung', 'ddd', '2016-04-20 22:39:52', 0),
(8, 'asdasd', 'asd', 'asdasdasd', '2016-04-28 19:04:39', 1, '1461166901358', 'Tiens Syariah Bandung', 'asd', '2016-04-20 22:41:41', 0),
(9, 'd', 'd', 'asd', '2016-04-29 19:04:39', 1, '1461167639174', 'Tiens Syariah Bandung', 'asd', '2016-04-20 22:53:59', 0),
(10, 'sdf', 'sdf', 'sdf', '2016-04-30 19:04:39', 1, '1461167790380', 'Tiens Syariah Bandung', 'sdf', '2016-04-20 22:56:30', 0),
(11, 'asdasd', 'asd', 'asd', '2016-04-24 19:04:39', 1, '1461167869048', 'Tiens Syariah Bandung', 'ddd', '2016-04-20 22:57:49', 0),
(12, 'asd', 'asd', 'asdasd', '2016-04-23 19:04:39', 1, '1461167975565', 'Tiens Syariah Bandung', 'asd', '2016-04-20 22:59:36', 0),
(13, 'asd', 'asd', 'asd', '2016-04-20 19:04:39', 1, '1461168166915', 'Tiens Syariah Bandung', 'asd', '2016-04-20 23:02:47', 0),
(14, 'ini juga judulnya panjang sekali looh', 'asd', 'asd', '2016-04-20 19:04:39', 1, '1461168246055', 'Tiens Syariah Bandung', 'asd', '2016-04-20 23:04:06', 0),
(15, 'sd', 'sdf', 'sdf', '2016-04-20 19:04:39', 1, '1461168425993', 'Tiens Syariah Bandung', 'sdf', '2016-04-20 23:07:06', 0),
(16, 'asdasd', 'asd', 'asd', '2016-04-20 19:04:39', 1, '1461168908733', 'Tiens Syariah Bandung', 'asd', '2016-04-20 23:15:09', 0),
(17, 'judul seminar updated', 'topik seminar updated', 'deskripsi seminar blalblallblablabab', '2016-04-22 16:19:00', 1, '1461169011670', 'Tiens Syariah Bandung', 'blalballablabllababla', '2016-04-22 16:19:49', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int(12) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(35) NOT NULL,
  `level` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `level`) VALUES
(1, 'tiens', '12370f5f67164570e5e6b0d8d7efb0e05096f7b5', 'raeni.tiens@gmail.com', 1),
(2, 'nunu', 'a82414e7c774a2d3ab0f9bef50c5f36a40c47d1f', 'annu.nura@gmail.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audience`
--
ALTER TABLE `audience`
  ADD PRIMARY KEY (`id_audience`);

--
-- Indexes for table `seminar`
--
ALTER TABLE `seminar`
  ADD PRIMARY KEY (`id_seminar`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`), ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audience`
--
ALTER TABLE `audience`
  MODIFY `id_audience` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `seminar`
--
ALTER TABLE `seminar`
  MODIFY `id_seminar` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
