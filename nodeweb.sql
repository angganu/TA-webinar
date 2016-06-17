-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 17, 2016 at 03:16 AM
-- Server version: 5.6.24
-- PHP Version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `nodeweb`
--

-- --------------------------------------------------------

--
-- Table structure for table `audience`
--

CREATE TABLE IF NOT EXISTS `audience` (
  `id_audience` int(12) NOT NULL,
  `id_seminar` int(12) NOT NULL,
  `username` varchar(35) NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `audience`
--

INSERT INTO `audience` (`id_audience`, `id_seminar`, `username`, `status`) VALUES
(30, 2, 'nunu', 1),
(31, 3, 'nunu', 1),
(32, 3, 'angga', 1);

-- --------------------------------------------------------

--
-- Table structure for table `data_user`
--

CREATE TABLE IF NOT EXISTS `data_user` (
  `username` varchar(35) NOT NULL,
  `nama_lengkap` varchar(50) NOT NULL,
  `jenis_kelamin` varchar(7) NOT NULL,
  `tgl_lahir` date NOT NULL,
  `agama` varchar(20) NOT NULL,
  `alamat_lengkap` text NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `photo` varchar(150) NOT NULL,
  `tgl_daftar` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `data_user`
--

INSERT INTO `data_user` (`username`, `nama_lengkap`, `jenis_kelamin`, `tgl_lahir`, `agama`, `alamat_lengkap`, `telepon`, `photo`, `tgl_daftar`) VALUES
('angga', 'Angga Nugraha', 'Pria', '2011-01-06', 'Islam', 'Jl. Desa Cipadung no.73\r\nRt.02 Rw.04 Kel.Cipadung Kec.Cibiru', '85974014224', 'angga1465220926473', '2016-06-06'),
('nunu', 'angga nugraha', 'Pria', '1992-01-19', 'Islam', 'Bandung', '85974014224', 'nunu1465215815346', '2016-06-03'),
('tiens', 'Tiens', 'Pria', '2000-01-01', '', 'Bandung', '0', 'tiens', '0000-00-00');

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
  `level` tinyint(1) NOT NULL,
  `key` varchar(50) NOT NULL,
  `tgl_upload` datetime NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `seminar`
--

INSERT INTO `seminar` (`id_seminar`, `judul`, `topik`, `deskripsi`, `waktu`, `level`, `key`, `tgl_upload`, `status`) VALUES
(1, 'tes seminar', 'tes', 'testes', '2016-06-08 09:04:00', 1, '1464746689143', '2016-06-10 11:00:09', 0),
(2, 'tes', 'tes', 'tes', '2016-06-09 07:41:00', 0, '1465432928165', '2016-06-09 07:42:08', 3),
(3, 'ttt', 'tes', 'ssss', '2016-06-10 11:00:00', 1, '1465531244934', '2016-06-10 11:00:45', 1),
(4, 'dd', 'ddd', 'asdasd', '2016-06-13 05:33:00', 1, '1465770843702', '2016-06-13 05:34:04', 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `email`, `level`) VALUES
(1, 'tiens', '12370f5f67164570e5e6b0d8d7efb0e05096f7b5', 'annu.nura@gmail.com', 1),
(2, 'nunu', 'a82414e7c774a2d3ab0f9bef50c5f36a40c47d1f', 'annu.nura@gmail.com', 2),
(3, 'angga', '26c352d286df9c08cafd83fa2f36143412aa5e0d', 'annu.nura@gmail.com', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audience`
--
ALTER TABLE `audience`
  ADD PRIMARY KEY (`id_audience`);

--
-- Indexes for table `data_user`
--
ALTER TABLE `data_user`
  ADD PRIMARY KEY (`username`);

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
  MODIFY `id_audience` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `seminar`
--
ALTER TABLE `seminar`
  MODIFY `id_seminar` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(12) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
