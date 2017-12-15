-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `titre`) VALUES
(1, 'Article 1'),
(2, 'Test 3'),
(3, 'Test 4'),
(4, 'yaba'),
(5, 'yabaqxa'),
(6, 'Yazid'),
(7, 'Article N°2'),
(8, 'LALALALA'),
(9, 'Laurz');

-- --------------------------------------------------------

--
-- Table structure for table `paragraphes`
--

CREATE TABLE `paragraphes` (
  `id` int(11) NOT NULL,
  `contenu` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `ordre` int(11) NOT NULL,
  `id_article` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Dumping data for table `paragraphes`
--

INSERT INTO `paragraphes` (`id`, `contenu`, `ordre`, `id_article`) VALUES
(45, '\nOhkalaala', 1, 4),
(44, 'Test\n', 2, 4),
(43, 'Ce sera the last one\n', 1, 6),
(42, 'Lol2', 3, 6),
(41, 'Lol', 4, 6),
(40, 'Lol', 2, 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paragraphes`
--
ALTER TABLE `paragraphes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `paragraphes`
--
ALTER TABLE `paragraphes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;