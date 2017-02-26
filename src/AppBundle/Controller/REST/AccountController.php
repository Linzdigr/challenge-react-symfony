<?php
namespace AppBundle\Controller\REST;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Form\Type\AccountType;
use AppBundle\Entity\Account;

class AccountController extends Controller{
    /**
     * @Rest\View()
     * @Rest\Get("/accounts")
     */
    public function getAccountsAction(Request $request){
        $accounts = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->findAll();

        return $accounts;
    }

    /**
     * @Rest\View()
     * @Rest\Get("/account/{id}")
     */
    public function getAccountAction($id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($id);

        return $account;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/account")
     */
    public function postAccountAction(Request $request)
    {
        $account = new Account();

        $form = $this->createForm(AccountType::class, $account);
        $form->submit($request->request->all()); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($account);
            $em->flush();

            return $account;
        }

        return $form;
    }

    /**
     * @Rest\View()
     * @Rest\Put("/account/{id}")
     */
    public function putAccountAction($id, Request $request){

    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/account/{id}")
     */
    public function removeAccountAction($id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $account = $em->getRepository('AppBundle:Account')
                    ->find($id);

        $em->remove($account);
        $em->flush();
    }
}
