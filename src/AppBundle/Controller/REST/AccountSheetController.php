<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\Type\AccountSheetType;
use AppBundle\Entity\AccountSheet;

class AccountSheetController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheets", name="accountsheet_list")
     */
    public function getAccountSheetsAction($account_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        return $this->apiResponse($account->getAccountSheets());
    }

    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheet/{sheet_id}", name="accountsheet_one")
     */
    public function getAccountSheetAction($account_id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        return $this->apiResponse($account->getSheetById($sheet_id));
    }

    /**
     * @Method("POST")
     * @Route("/account/{account_id}/sheet", name="accountsheet_create")
     */
    public function postAccountSheetsAction($account_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($account_id);

        if ($content = $request->getContent()) {    // TODO: enhance json decode in controllers
            $jsonPost = json_decode($content, true);
        }

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = new AccountSheet();
        $aSheet->setAccount($account);

        $form = $this->createForm(AccountSheetType::class, $aSheet);
        $form->submit($jsonPost); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($aSheet);
            $em->flush();

            return $this->apiResponse($aSheet, Response::HTTP_CREATED);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("PUT")
     * @Route("/account/{account_id}/sheet/{sheet_id}", name="accountsheet_modify")
     */
    public function putAccountSheetAction($account_id, $sheet_id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $account = $em->getRepository('AppBundle:Account')
                    ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if(empty($aSheet))
            return $this->notFound('AccountSheet');

        $form = $this->createForm(AccountSheetType::class, $aSheet);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $em->merge($aSheet);    // Pas nécessaire, juste pas mesure de clarté
            $em->flush();
            return $this->apiResponse($aSheet);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("DELETE")
     * @Route("/account/{account_id}/sheet/{sheet_id}", name="accountsheet_destroy")
     */
    public function removeAccountSheetAction($account_id, $sheet_id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $account = $em->getRepository('AppBundle:Account')->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if($aSheet){
            $em->remove($aSheet);
            $em->flush();
        }

        return $this->apiResponse([]);
    }
}
