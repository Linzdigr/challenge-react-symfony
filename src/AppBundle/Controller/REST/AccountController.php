<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\Type\AccountType;
use AppBundle\Entity\Account;

class AccountController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/accounts", name="account_list")
     */
    public function getAccountsAction(Request $request){
        $accounts = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->findAll();

        return $this->apiResponse($accounts);
    }

    /**
     * @Method("GET")
     * @Route("/account/{id}", name="account_one", requirements={"id": "\d+"})
     */
    public function getAccountAction($id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($id);

        return $this->apiResponse($account);
    }

    /**
     * @Method("POST")
     * @Route("/account", name="account_create")
     */
    public function postAccountAction(Request $request)
    {
        $account = new Account();

        if ($content = $request->getContent()) {    // TODO: enhance json decode in controllers
            $jsonPost = json_decode($content, true);
        }

        $form = $this->createForm(AccountType::class, $account);
        $form->submit($jsonPost); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($account);
            $em->flush();

            return $this->apiResponse($account, Response::HTTP_CREATED);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("PUT")
     * @Route("/account/{id}", name="account_modify", requirements={"id": "\d+"})
     */
    public function putAccountAction($id, Request $request){

    }

    /**
     * @Method("DELETE")
     * @Route("/account/{id}", name="account_destroy", requirements={"id": "\d+"})
     */
    public function removeAccountAction($id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $account = $em->getRepository('AppBundle:Account')
                    ->find($id);
        if ($account) {
            $em->remove($account);
            $em->flush();
        }

        return $this->apiResponse([]);
    }
}
