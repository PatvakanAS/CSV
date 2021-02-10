<?php

/**
 * Plugin Name:Get Data
 * Plugin URI:  #
 * Description: Get data for ......
 * Author: Super  Admin
 * Author #
 * Version: 0.1
 **/


$Data = file_get_contents("php://input");
$locData = json_decode($Data, true);
print_r($locData);

if(isset($locData) && !empty($locData)){

    function create_csv_string($data) {

        // Open temp file pointer
        if (!$fp = fopen('php://temp', 'w+')) return FALSE;

        // Loop data and write to file pointer
        foreach ($data as $line) fputcsv($fp, $line);

        // Place stream pointer at beginning
        rewind($fp);

        // Return the data
        return stream_get_contents($fp);

    }

    function send_csv_mail ($csvData, $body, $to = 'info@thetidegroup.com', $subject = 'CSV message', $from = 'thetidegroup.com') {

        // This will provide plenty adequate entropy
        $multipartSep = '-----'.md5(time()).'-----';

        // Arrays are much more readable
        $headers = array(
            "From: $from",
            "Reply-To: $from",
            "Content-Type: multipart/mixed; boundary=\"$multipartSep\""
        );

        // Make the attachment
        $attachment = chunk_split(base64_encode(create_csv_string($csvData)));

        // Make the body of the message
        $body = "--$multipartSep\r\n"
            . "Content-Type: text/plain; charset=ISO-8859-1; format=flowed\r\n"
            . "Content-Transfer-Encoding: 7bit\r\n"
            . "\r\n"
            . "$body\r\n"
            . "--$multipartSep\r\n"
            . "Content-Type: text/csv\r\n"
            . "Content-Transfer-Encoding: base64\r\n"
            . "Content-Disposition: attachment; filename=\"file.csv\"\r\n"
            . "\r\n"
            . "$attachment\r\n"
            . "--$multipartSep--";

        // Send the email, return the result
        return @mail($to, $subject, $body, implode("\r\n", $headers));

    }

    $array = array(
        "0" => $locData,
    );

    send_csv_mail($array, "Hello World!!!\r\n This is simple text email message.");



}
