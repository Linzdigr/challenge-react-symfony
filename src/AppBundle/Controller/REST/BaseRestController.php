<?php
namespace AppBundle\Controller\REST;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

abstract class BaseRestController extends Controller{

    protected $parsedJsonRequest;

    public function __construct(){
    }

    protected function serialize($data){
        return $this->container->get('jms_serializer')
            ->serialize($data, 'json');
    }

    protected function apiResponse($data, $responseCode = Response::HTTP_OK){
        if(empty($data))
            $responseCode = Response::HTTP_NO_CONTENT;

        return (new Response($this->serialize($data), $responseCode));
    }

    protected function notFound($type){
        return $this->apiResponse(['message' => "$type not found or is not provided"], Response::HTTP_NOT_FOUND);
    }

    public function __destruct(){

    }
}
