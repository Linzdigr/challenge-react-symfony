<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Form\Type\AccountSheetType;
use AppBundle\Entity\AccountSheet;

class AccountSheetController extends BaseRestController{
    /**
     * @Rest\View()
     * @Rest\Get("/account/{account_id}/sheets")
     */
    public function getAccountSheetsAction($account_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        return $account->getAccountSheets();
    }

    /**
     * @Rest\View()
     * @Rest\Get("/account/{account_id}/sheet/{sheet_id}")
     */
    public function getAccountSheetAction($account_id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        return $account->getSheetById($sheet_id);
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_CREATED)
     * @Rest\Post("/account/{account_id}/sheet")
     */
    public function postAccountSheetsAction($account_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:Account')
                 ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = new AccountSheet();
        $aSheet->setAccount($account);

        $form = $this->createForm(AccountSheetType::class, $aSheet);
        $form->submit($request->request->all()); // Validation des données

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($aSheet);
            $em->flush();

            return $aSheet;
        }

        return $form;
    }

    /**
     * @Rest\View()
     * @Rest\Put("/account/{account_id}/sheet/{sheet_id}")
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
            return $aSheet;
        }

        return $form;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/account/{account_id}/sheet/{sheet_id}")
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
    }
}
