<?php

	error_reporting(E_ALL);

	include("simple_html_dom.php");

	$html = file_get_html($_GET['url']);
	$lead = $html->find('p[class="lead"]')[0]->plaintext;

	echo $lead;