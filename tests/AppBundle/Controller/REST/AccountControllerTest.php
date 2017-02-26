<?php

namespace Tests\AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class AccountControllerTest extends WebTestCase
{
    public function testIndex()
    {
        $client = static::createClient();

        $crawler = $client->request('GET', '/api/accounts');

        $this->assertEquals(Response::HTTP_OK, $client->getResponse()->getStatusCode());

        $data = json_decode($client->getResponse()->getContent(), true);

        foreach($data as $el){
            $this->assertArrayHasKey('id', $el);
            $this->assertArrayHasKey('name', $el);
            $this->assertArrayHasKey('description', $el);
        }
    }

    public function testPostAccount(){
        $client = static::createClient();

        $crawler = $client->request('POST', '/api/account', [
            'name' => 'testajout-'.time(),
            'description' => 'Some text description'
        ]);

        $this->assertEquals(Response::HTTP_CREATED, $client->getResponse()->getStatusCode());

        $data = json_decode($client->getResponse()->getContent(), true);

        $this->assertArrayHasKey('accountSheets', $data);
        $this->assertArrayHasKey('id', $data);
        $this->assertArrayHasKey('name', $data);
        $this->assertArrayHasKey('description', $data);
    }
}
