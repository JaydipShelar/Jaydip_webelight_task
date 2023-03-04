-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2023 at 03:46 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webelight_practical`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `color` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `product_name`, `price`, `color`, `size`, `quantity`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'test one', 50, 'red', 'medium', 100, 1, '2023-03-04 13:40:37', NULL, NULL),
(2, 'test two', 30, 'black', 'large', 50, 1, '2023-03-04 13:41:22', NULL, NULL),
(3, 'test three', 300, 'black', 'large', 50, 1, '2023-03-04 13:41:31', NULL, NULL),
(4, 'test four', 300, 'black', '10', 100, 1, '2023-03-04 13:41:40', NULL, NULL),
(5, 'test five', 300, 'black', '10', 100, 1, '2023-03-04 13:41:46', NULL, NULL),
(6, 'test six', 300, 'black', '10', 100, 1, '2023-03-04 13:41:51', NULL, NULL),
(7, 'test seven', 100, 'green', '80', 1200, 1, '2023-03-04 13:42:09', NULL, NULL),
(8, 'test eight', 100, 'green', '80', 1200, 1, '2023-03-04 13:42:13', NULL, NULL),
(9, 'test nine', 100, 'green', '80', 1200, 1, '2023-03-04 13:42:17', NULL, NULL),
(10, 'test ten', 1001, 'green', '80', 1200, 1, '2023-03-04 13:42:23', NULL, NULL),
(11, 'test eleven', 50, 'blue', '800', 5, 1, '2023-03-04 13:42:42', NULL, NULL),
(12, 'test twelve', 100, 'red', '800', 5, 0, '2023-03-04 13:42:49', '2023-03-04 14:02:08', '2023-03-04 14:09:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `mobile` varchar(16) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `type` enum('admin','user') NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mobile`, `email`, `password`, `type`, `is_active`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin', '1111111111', 'admin@admin.com', '123456', 'admin', 1, '2023-03-04 12:50:34', NULL, NULL),
(2, 'jaydip', '8460856083', 'shelarjd007@gmail.com', '123456', 'user', 1, '2023-03-04 12:59:04', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
