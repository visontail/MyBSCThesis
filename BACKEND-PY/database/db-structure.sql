
--
-- Database: `webvelo`
--

--
-- Table structure for table `Measurement`
--

CREATE TABLE `web_velo`.`Measurements` (
  `MeasureID` INT NOT NULL AUTO_INCREMENT,
  `StationID` INT NOT NULL,
  `xtxName` VARCHAR(100) NOT NULL,
  `startTime` DATETIME NULL,
  `endTime` DATETIME NULL,
  `MeasIntervall` INT NULL,
  `OtherTraff1` INT NULL,
  `PedTraff1` INT NULL,
  `CycTraff1` INT NULL,
  `OtherTraff2` INT NULL,
  `PedTraff2` INT NULL,
  `CycTraff2` INT NULL,
  PRIMARY KEY (`MeasureID`));

--
-- Table structure for table `Stations`
--

CREATE TABLE `Stations` (
  `StationUid` varchar(100) NOT NULL,
  `StationID` int(11) NOT NULL,
  `StationName` varchar(100) NOT NULL,
  `StationImg` varchar(100),
  `posLatitude` float NOT NULL,
  `posLongitude` float NOT NULL,
  `isApproved` tinyint(1) NOT NULL,
  PRIMARY KEY (`StationID`)
);

--
-- ADD FOREIGN KEY 'StationID'
--

ALTER TABLE `Measurements`
  ADD CONSTRAINT `StationID` FOREIGN KEY (`StationID`) REFERENCES `Stations` (`StationID`);
COMMIT;

--
-- Dumping data for table `Stations`
--

INSERT INTO `Stations` (`station_Uid`, `Station_ID`, `station_Name`, `pos_Latitude`, `pos_Longitude`, `is_Approved`) VALUES
('992e80a8-3e23-4d2a-a5c9-b5a5580c580e', 24811, 'Velence, Északi strand', 47.2385, 18.6349, 1),
('d5418f78-f295-4ae8-8ad3-5ddd49c2a0ec', 96001, 'Sárvár, Celli út', 47.2392, 16.9739, 1),
('ef154f3f-c1a8-41aa-9584-b0cecba3e2cf', 102001, 'Pécs, Ranga László út', 46.1113, 18.1848, 1),
('6373724e-68b7-4458-aaa4-b80d81ec314e', 102003, 'Kölked', 45.9522, 18.6671, 1),
('d7dd56b4-4784-4c7a-aaa8-ae7a26847fac', 102004, 'Lánycsók', 45.9994, 18.6323, 1),
('f0921b27-f5d6-4ed0-bd4d-2a62a5e0046f', 103001, 'Kecskemét, 5-44-54. főúti körforgalom', 46.8777, 19.7112, 1),
('c9502111-d379-4288-b2c7-d6f4e296fae1', 103006, 'Kecskemét, 441-es (Ceglédi) út', 46.9472, 19.713, 1),
('76de18b5-a4ea-4e19-bfa7-a91346bd2735', 103007, 'Nyárlőrinc', 46.8675, 19.8792, 1),
('51e9dd99-f07b-4d51-9e30-7308a3ca9c7c', 103008, 'Kiskunhalas', 46.463, 19.463, 1),
('a9d9eac3-a2aa-453b-a954-b13159b553d5', 103009, 'Baja', 46.1845, 18.9845, 1),
('8f8cb48c-2ac1-453e-9d81-b3992d8e4ea5', 103010, 'Mélykút', 46.2084, 19.3655, 1),
('0bac5b55-f41f-4a76-a882-9a95817d4e51', 104004, 'Füzesgyarmat-Szeghalom közötti kerékpárút', 47.0535, 21.1939, 1),
('bfbda14c-0a0d-4143-9e90-a026e8d44507', 104005, 'Békéscsaba, 47-es főút ', 46.6792, 21.0381, 1),
('42773b32-aabc-46f6-9b66-b7114b895e8c', 104006, 'Szarvas-Ezüstszőlő', 46.8442, 20.61, 1),
('87afb17f-6a05-4977-8f23-f4e127ca69f5', 105001, 'Aszaló', 48.2261, 20.9556, 1),
('59e32862-f257-4482-abf3-266e31f1c685', 105002, 'Sátoraljaújhely', 48.4265, 21.6353, 1),
('16bdcc89-4c44-4f7e-8dbd-7aa1e923847e', 105003, 'Tarcal', 48.1192, 21.352, 1),
('755ed78a-5e64-493d-9df6-10788885d544', 106001, 'Makó, 43. főút Nagylak felé', 46.2137, 20.5235, 1),
('b8be468f-5dc3-4516-81f7-793841633314', 106002, 'Domaszék, 55. főút VII. körzet tanya', 46.2302, 19.9409, 1),
('b216a31a-c935-4370-ac0e-ab2c872397d0', 106005, 'Mórahalom, Kissori út', 46.2082, 19.8857, 1),
('e2c0fd0a-c310-4b8a-8350-e077d03797ad', 106008, 'Ópusztaszer', 46.4894, 20.0738, 1),
('9f5282c4-b7b9-47c9-90f9-c1f0d5761d28', 106009, 'Hódmezővásárhely', 46.4366, 20.3602, 1),
('c7c20873-d4de-43cc-8a7e-f4922faea65d', 107001, 'Agárd-Dinnyés, part menti út', 47.1874, 18.5793, 1),
('c394c98d-0c78-441d-b163-e20f29099b83', 107004, 'Pákozd, Budai út', 47.2244, 18.5609, 1),
('de7ecd19-2b33-4554-ae4f-00c15b2f71b2', 107005, 'BuBa-Szabadbattyán (EV14)', 47.1355, 18.3829, 1),
('d36c69a5-7de9-4748-95a7-8c2cc5eb5b77', 107006, 'BuBa-Füle (EV14)', 47.058, 18.251, 1),
('d01c0eab-7efe-4da1-9c7e-6a12f71d37e0', 108001, 'Fertőszéplak, Soproni u.', 47.6158, 16.8257, 1),
('5c98b474-eb55-430e-848c-939b43810a88', 108002, 'Hédervár, Fő út', 47.8313, 17.469, 1),
('e9dbdcbb-9632-4245-ac3c-8d2e4256ebcd', 108003, 'Bezenye EV6', 47.9554, 17.2201, 1),
('23daea1e-812f-41f9-88ba-67fd0a53caa4', 108004, 'Fertőd', 47.6254, 16.8735, 1),
('209c3139-7ceb-4b00-a7c4-b31c0b2fd73f', 108005, 'Győr-Pannonhalma', 47.6265, 17.6743, 1),
('86e22f11-14d7-430e-b4e8-d40dbff38ee5', 109003, 'Hajdúsámson', 47.5839, 21.7186, 1),
('32ce573b-7d8b-4549-93ca-c9e23596bc4f', 109004, 'Berettyóújfalu-Berettyószentmárton', 47.1909, 21.5486, 1),
('fc451884-d20e-437f-9ca1-a6f01ebf9420', 109005, 'Derecske', 47.3673, 21.5864, 1),
('3cfd0322-2fbd-4ba2-bc8e-a495f9629a68', 109006, 'Berettyóújfalu, 47-es főút mellett', 47.2587, 21.5431, 1),
('6a81a840-85e9-47bc-a9fe-3290cdb752cb', 110001, 'Gyöngyös', 47.7994, 19.9459, 1),
('fbc443a4-a545-4a81-85be-49943689b3ba', 111001, 'Esztergom, Szentgyörgymező', 47.8126, 18.7469, 1),
('80cb5f67-f7b6-40b9-964e-94f9779f09b1', 111004, 'Dunaalmás (EV6)', 47.722, 18.2705, 1),
('af19e5bf-e4fa-433c-8bc7-86410cb1ac2d', 112001, 'Salgótarján, Bajcsy Zs. út.', 48.0895, 19.7899, 1),
('1e9f4777-3aa1-4c10-88ee-1f55c611285f', 113001, 'Vác', 47.7677, 19.1343, 1),
('460315dc-889e-4f06-b26f-3f20c9bb4220', 113002, 'Zebegény-Nagymaros', 47.7689, 18.9389, 1),
('c4f5e8f3-c5af-4243-8506-f92a3311d1d7', 113003, 'Visegrád', 47.7731, 18.9634, 1),
('4fbdbf90-ca0c-4517-9b2b-8c0726547311', 113004, 'Budakalász-Szentendre EuroVelo 6', 47.6336, 19.0809, 1),
('a70decd0-6b72-4015-ae75-62d1487ce714', 113005, 'Törökbálint BuBa', 47.4438, 18.9434, 1),
('fb4dc4ef-01ff-436d-82bf-50a498fc7bea', 113006, 'Budapest-Dunakeszi EV6 kerékpárút', 47.6158, 19.1097, 1),
('f17d9676-7be2-4ea5-aea3-0ab941f3ab96', 114002, 'Kéthely-Marcali közötti kerkpárút', 46.619, 17.3985, 1),
('85ddad32-0ebb-4fc4-ade6-374d375d3240', 115001, 'Nyíregyháza, LEGO-gyárhoz vezető kp út', 47.9567, 21.6583, 1),
('34ff6f75-bfdb-4b6a-890f-18db6dd1bf4e', 115003, 'Csengersima, 49. főút határ felé', 47.8606, 22.7502, 1),
('30238c8a-80bd-49f4-a923-4f977c062569', 115004, 'Nyírtelek', 48.0283, 21.6034, 1),
('d130dc18-97e8-4a7e-9259-27736365c21a', 115005, 'Nyírmeggyes', 47.898, 22.2219, 1),
('46000fc1-7787-418f-8dbf-fd1c7b1e6ec5', 115006, 'Vásárosnamény', 48.1274, 22.3239, 1),
('b20c585e-78e1-477b-94c2-fd8479ea507e', 115007, 'Nyírbátor', 47.8289, 22.1116, 1),
('53e4cb92-c40c-4775-8c7b-6739ff2df7e5', 116002, 'Karcag, Madarasi út', 47.3268, 20.908, 1),
('41cbc9f5-52b5-4070-9ba5-4642da0eb2b6', 116003, 'Rákócziújfalu', 47.0492, 20.2728, 1),
('b7eb9307-7b5e-4c73-9e92-96f5af55417c', 116004, 'Tiszafüred', 47.6305, 20.7448, 1),
('d4c6389e-0813-4de6-a1a9-5f9b838ed507', 118001, 'Tanakajd, 87. főút mellett', 47.1887, 16.7292, 1),
('417732aa-7f54-4927-8aeb-62c4d66addb1', 118002, 'Bük', 47.3932, 16.7391, 1),
('b82033d8-9490-446d-a8d4-c212b3c628cd', 118003, 'Szombathely, Bucsu-határátkelő felé', 47.2457, 16.4859, 1),
('2f0ef317-9ae7-4233-85a6-c5e9163a6e0a', 119003, 'Balatonederics, 71. főút bevezető szakasz', 46.7968, 17.3831, 1),
('480c673e-572a-4ce4-b551-68dc35b13017', 119004, 'Zánka', 46.8804, 17.7045, 1),
('da45db72-68e9-4cc0-b224-6df96476723c', 119005, 'Szentkirályszabadja', 47.065, 17.955, 1),
('c64658f1-20c0-4829-95b8-9bfd4c937383', 119006, 'Örvényes', 46.9171, 17.819, 1),
('5e299fc5-aa4d-4db4-8f46-1b6ee9d3bd2b', 120001, 'Lenti, 75. főút Rédics felé', 46.6219, 16.5179, 1),
('ec69185b-426c-454f-bcfb-b15993114202', 120002, 'Zalaszentgyörgy, Vasútállomás', 46.8719, 16.7106, 1),
('834689f8-92eb-4c6c-826d-a6983272e415', 120003, 'Fenékpuszta', 46.7108, 17.2474, 1);

--
-- Dumping data for table `Stations`
--