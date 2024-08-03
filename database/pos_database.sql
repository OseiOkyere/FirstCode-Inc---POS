-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 02, 2024 at 07:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pos_database`
--
DROP DATABASE IF EXISTS `pos_database`;
CREATE DATABASE IF NOT EXISTS `pos_database` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pos_database`;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `unit_price`, `quantity`, `date_added`) VALUES
(6, 'Stapler', 'Office Supplies', 3.50, 100, '2024-07-31 06:16:23'),
(7, 'Staples', 'Office Supplies', 1.00, 200, '2024-07-31 06:16:23'),
(8, 'Binder', 'Office Supplies', 2.50, 300, '2024-07-31 06:16:23'),
(9, 'Calculator', 'Electronics', 10.00, 40, '2024-07-31 06:16:23'),
(10, 'Printer', 'Electronics', 120.00, 10, '2024-07-31 06:16:23'),
(11, 'Mouse', 'Electronics', 15.00, 30, '2024-07-31 06:16:23'),
(12, 'Keyboard', 'Electronics', 20.00, 24, '2024-07-31 06:16:23'),
(13, 'Monitor', 'Electronics', 150.00, 797, '2024-07-31 06:16:23'),
(14, 'USB Drive', 'Electronics', 8.00, 50, '2024-07-31 06:16:23'),
(15, 'Headphones', 'Electronics', 25.00, 20, '2024-07-31 06:16:23'),
(17, 'Gilbert kukah', 'Stationary', 60.00, 68, '2024-07-31 06:16:23');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `purchase_datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`sale_id`, `product_id`, `quantity`, `total_cost`, `purchase_datetime`) VALUES
(51, 6, 4000, 14000.00, '2024-07-31 08:47:58'),
(52, 6, 5, 17.50, '2024-07-01 10:15:00'),
(53, 7, 20, 20.00, '2024-07-03 11:30:00'),
(54, 8, 3, 7.50, '2024-07-05 09:45:00'),
(55, 6, 8, 28.00, '2024-07-07 13:20:00'),
(56, 7, 15, 15.00, '2024-07-09 14:10:00'),
(57, 8, 7, 17.50, '2024-07-11 16:00:00'),
(58, 6, 4, 14.00, '2024-07-13 10:00:00'),
(59, 7, 25, 25.00, '2024-07-15 12:25:00'),
(60, 8, 5, 12.50, '2024-07-17 15:35:00'),
(61, 6, 10, 35.00, '2024-07-19 11:05:00'),
(62, 7, 12, 12.00, '2024-07-21 14:50:00'),
(63, 8, 6, 15.00, '2024-07-23 13:30:00'),
(64, 6, 7, 24.50, '2024-07-25 09:00:00'),
(65, 7, 18, 18.00, '2024-07-27 16:45:00'),
(66, 8, 4, 10.00, '2024-07-29 10:10:00'),
(67, 6, 6, 21.00, '2024-07-30 13:25:00'),
(68, 7, 30, 30.00, '2024-07-31 11:15:00'),
(69, 6, 4000, 14000.00, '2024-07-31 11:08:55'),
(70, 8, 60, 150.00, '2024-08-02 04:12:29'),
(71, 8, 500, 1250.00, '2024-08-02 04:15:48'),
(72, 13, 1, 150.00, '2024-08-02 04:18:15'),
(73, 13, 2, 300.00, '2024-08-02 04:41:16'),
(74, 12, 1, 20.00, '2024-08-02 07:02:11');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password_hash`, `email`, `created_at`) VALUES
(1, 'kwamegilbert1114@gmail.com', '$2y$10$d7MommDfdt0lGrJNWBUK7.5bfzRKmPOgyfKJiDqx33G8PTsExioJ6', 'kwamegilbert1114@gmail.com', '2024-07-31 09:55:35'),
(2, 'kwamegilbert1114', '$2y$10$yW5kk36KrdbtNpILabXlXO/f4F/xrNBkRLY6DWMinvf0dEn4wA.cq', 'kwamegilbert1114@gmail.com', '2024-07-31 09:56:19'),
(3, 'kwamegil', '$2y$10$/p2gouJvhvHKaRKn3icEju1vnLQvusHLMn82DCuWShba58OgLoQLO', 'kwamegilbert1114@hjh', '2024-07-31 10:00:19'),
(4, 'john_doe', '$2y$10$KLYS3X.kAiC43hX/0SBBn..bUTh3hdwgtJPIg4er1JR06Js/fxPYy', 'kwamegilbert1114@gmail.com', '2024-07-31 18:37:02'),
(5, 'admin', '$2y$10$1I7TK4PtwE8KJusMA62e1uwTBWtFt/Ebpuctc4wavQUVVoibaDRZm', 'admin@admin.com', '2024-08-02 01:05:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`sale_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `sale_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
