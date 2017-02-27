<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\Type\AccountType;
use AppBundle\Entity\Account;

class AccountController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/account", name="account_list")
     */
    public function getAccountsAction(Request $request){
        $accounts = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->findAll();

        $encoder = new JsonEncoder();
        $normalizer = new ObjectNormalizer($classMetadataFactory);

        $serializer = new Serializer(array($normalizer), array($encoder));
        return $serializer->serialize($accounts, 'json', array('groups' => array('account')) );
    }

    /**
     * @Method("GET")
     * @Route("/account/{id}", name="account_one", requirements={"id": "\d+"})
     */
    public function getAccountAction($id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($id);

        $encoder = new JsonEncoder();
        $normalizer = new ObjectNormalizer();

        $serializer = new Serializer(array($normalizer), array($encoder));
        return $serializer->serialize($account, 'json', array('groups' => array('account')) );
    }

    /**
     * @Method("POST")
     * @Route("/account", name="account_create")
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
    }
}
