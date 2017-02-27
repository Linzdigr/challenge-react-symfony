<?php
namespace AppBundle\Controller\REST;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

abstract class BaseRestController extends Controller{

    public function __construct(){

    }

    protected function notFound($type){
        return \FOS\RestBundle\View\View::create(['message' => "$type not found"], Response::HTTP_NOT_FOUND);
    }

    public function __destruct(){

    }

}
