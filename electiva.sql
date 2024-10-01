
CREATE DATABASE electiva;

USE electiva;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `documentType` varchar(10) NOT NULL,
  `documentNumber` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentNumber` (`documentNumber`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `fullName`, `lastname`, `documentType`, `documentNumber`, `email`, `phone`, `username`, `password`) VALUES
(1, 'Johan Sebastian', 'Cardona Bohorquez', 'CC', '1128440421', 'j-sebas@hotmail.com', '3004971952', 'jsebascarbo', '@456sebastianC');

-- Definir AUTO_INCREMENT en la tabla `users`
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


