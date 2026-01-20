-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 20, 2026 at 05:19 AM
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
-- Database: `aayumalun`
--

-- --------------------------------------------------------

--
-- Table structure for table `aboutus`
--

CREATE TABLE `aboutus` (
  `id` int(254) NOT NULL,
  `heading` varchar(254) NOT NULL,
  `longPara` varchar(254) NOT NULL,
  `firstCardHeading` varchar(254) NOT NULL,
  `firstCardPara` varchar(254) NOT NULL,
  `secCardHeading` varchar(254) NOT NULL,
  `secCardPara` varchar(254) NOT NULL,
  `thirdCardHeading` varchar(254) NOT NULL,
  `thirdCardHeading2` varchar(254) NOT NULL,
  `thirdCardPara` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutus`
--

INSERT INTO `aboutus` (`id`, `heading`, `longPara`, `firstCardHeading`, `firstCardPara`, `secCardHeading`, `secCardPara`, `thirdCardHeading`, `thirdCardHeading2`, `thirdCardPara`) VALUES
(1, 'About Our Company', 'We are committed to delivering high-quality products and services that create real value for our customers.', 'Our Mission', 'To innovate continuously and provide solutions that empower businesses worldwide.', 'Our Vision', 'To become a global leader known for trust, quality, and customer satisfaction.', 'Our Values', 'What Drives Us', 'Integrity, teamwork, innovation, and a passion for excellence guide everything we do.');

-- --------------------------------------------------------

--
-- Table structure for table `aboutusimage`
--

CREATE TABLE `aboutusimage` (
  `id` int(254) NOT NULL,
  `fullImage` varchar(254) NOT NULL,
  `firstCardImage` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutusimage`
--

INSERT INTO `aboutusimage` (`id`, `fullImage`, `firstCardImage`) VALUES
(1, '1768722158531-608863878.jpg', '1768722158530-329194162.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `cover_image` varchar(255) NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `author_name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `content`, `cover_image`, `author_id`, `author_name`, `created_at`, `updated_at`) VALUES
(6, 'title', 'content', '1768836894910-899694516.png', 2, 'bbbb', '2026-01-19 15:34:54', '2026-01-19 15:34:54'),
(8, 'title', 'content', '1768836897959-327913878.png', 2, 'bbbb', '2026-01-19 15:34:57', '2026-01-19 15:34:57');

-- --------------------------------------------------------

--
-- Table structure for table `clientmess`
--

CREATE TABLE `clientmess` (
  `id` int(254) NOT NULL,
  `name` varchar(254) NOT NULL,
  `email` varchar(254) NOT NULL,
  `mess` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientmess`
--

INSERT INTO `clientmess` (`id`, `name`, `email`, `mess`) VALUES
(1, 'd', 'b@gmail.ocm', 'mksama'),
(2, 'd', 'b@gmail.ocm', 'mksama');

-- --------------------------------------------------------

--
-- Table structure for table `faqs`
--

CREATE TABLE `faqs` (
  `id` int(254) NOT NULL,
  `ques` varchar(254) NOT NULL,
  `ans` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faqs`
--

INSERT INTO `faqs` (`id`, `ques`, `ans`) VALUES
(1, 'ques', 'ans'),
(2, 'ques', 'ans'),
(4, 'ques changesd 34', 'akjbns');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `title` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `image`, `title`) VALUES
(10, 'uploads/gallery/1768832340849-575503006.jpg', 'Dharmendra Thakur'),
(12, 'uploads/gallery/1768832343425-116599682.jpg', 'Dharmendra Thakur'),
(13, 'uploads/gallery/1768832346313-177521792.jpg', 'Dharmendra Thakur');

-- --------------------------------------------------------

--
-- Table structure for table `herosection`
--

CREATE TABLE `herosection` (
  `id` int(254) NOT NULL,
  `slogan` varchar(254) NOT NULL,
  `description` varchar(254) NOT NULL,
  `btn1Text` varchar(254) NOT NULL,
  `btn1Link` varchar(254) NOT NULL,
  `btn2Text` varchar(254) NOT NULL,
  `btn2Link` varchar(254) NOT NULL,
  `images` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `herosection`
--

INSERT INTO `herosection` (`id`, `slogan`, `description`, `btn1Text`, `btn1Link`, `btn2Text`, `btn2Link`, `images`) VALUES
(1, 'slogan121xx', 'description', 'btn1text', 'btn1link', 'btn2tesxtxs xs', 'btn2link', '[\"1768717281527-641476230.jpg\",\"1768717281539-666033037.jpg\"]');

-- --------------------------------------------------------

--
-- Table structure for table `mission`
--

CREATE TABLE `mission` (
  `id` int(254) NOT NULL,
  `heading` varchar(254) NOT NULL,
  `shortpara` varchar(254) NOT NULL,
  `firstCardHeading` varchar(254) NOT NULL,
  `firstCardPara` varchar(254) NOT NULL,
  `secCardHeading` varchar(254) NOT NULL,
  `secCardPara` varchar(254) NOT NULL,
  `thirdCardHeading` varchar(254) NOT NULL,
  `thirdCardPara` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mission`
--

INSERT INTO `mission` (`id`, `heading`, `shortpara`, `firstCardHeading`, `firstCardPara`, `secCardHeading`, `secCardPara`, `thirdCardHeading`, `thirdCardPara`) VALUES
(1, 'Our Mission', 'Our mission is to deliver high-quality digital solutions that empower businesses to grow and succeed in the modern world.', 'Innovation', 'We continuously innovate to create cutting-edge solutions that solve real-world problems.', 'Integrity', 'We believe in transparency, honesty, and building long-term trust with our clients.', 'Excellence', 'We strive for excellence in everything we do, from planning to execution and delivery.');

-- --------------------------------------------------------

--
-- Table structure for table `missionimage`
--

CREATE TABLE `missionimage` (
  `id` int(254) NOT NULL,
  `img1` varchar(254) NOT NULL,
  `img2` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `missionimage`
--

INSERT INTO `missionimage` (`id`, `img1`, `img2`) VALUES
(1, '1768726201699-288561330.jpg', '1768726201702-758621827.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `name` varchar(254) NOT NULL,
  `dp` varchar(254) NOT NULL,
  `description` varchar(254) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `name`, `dp`, `description`) VALUES
(2, 'Dharmendra Thakur', '1768809564996-367635297.jpg', 'Lorem lorem lorem lorem lorem');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') DEFAULT NULL,
  `mobNo` int(11) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT 0,
  `password` varchar(254) NOT NULL,
  `image` varchar(254) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `gender`, `mobNo`, `isAdmin`, `password`, `image`, `created_at`) VALUES
(2, 'bbbb', 'ecxample@gmail.com', 'Male', 98, 0, '$2b$10$TuojROajiMBSfYZ4ULxg8.UmEqmK9E/Ks1Pqxadmpt0b1n63uQ8YS', '1768381459226-111373826.jpg', '2026-01-14 09:04:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aboutus`
--
ALTER TABLE `aboutus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutusimage`
--
ALTER TABLE `aboutusimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `clientmess`
--
ALTER TABLE `clientmess`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `herosection`
--
ALTER TABLE `herosection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mission`
--
ALTER TABLE `mission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `missionimage`
--
ALTER TABLE `missionimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aboutus`
--
ALTER TABLE `aboutus`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutusimage`
--
ALTER TABLE `aboutusimage`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `clientmess`
--
ALTER TABLE `clientmess`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `herosection`
--
ALTER TABLE `herosection`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mission`
--
ALTER TABLE `mission`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `missionimage`
--
ALTER TABLE `missionimage`
  MODIFY `id` int(254) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
