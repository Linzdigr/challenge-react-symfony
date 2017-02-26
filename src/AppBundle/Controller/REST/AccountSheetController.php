<?php
namespace AppBundle\Controller\REST;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Form\Type\AccountSheetType;
use AppBundle\Entity\AccountSheet;

class AccountSheetController extends Controller{
    /**
     * @Rest\View()
     * @Rest\Get("/account/{account_id}/sheets")
     */
    public function getAccountSheetsAction($account_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if (empty($account)) {
            return $this->notFound('Account');
        }

        return $account->getAccountSheets();
    }

    /**
     * @Rest\View()
     * @Rest\Get("/account/{account_id}/sheet/{sheet_id}")
     */
    public function getAccountSheetAction($id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
                 ->getRepository('AppBundle:AccountSheet')
                 ->find($id);

        if(empty($account))
            return $this->notFound('AccountSheet');

        return $account->getOperations();
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
            return $this->notFound('AccountSheet');

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
     * @Rest\Put("/sheet/{id}")
     */
    public function putAccountSheetAction($id, Request $request){
        $aSheet = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:AccountSheet')
                    ->find($id);

        if (empty($aSheet)) {
            return new JsonResponse(['message' => 'Sheet not found'], Response::HTTP_NOT_FOUND);
        }

        $form = $this->createForm(AccountSheetType::class, $aSheet);

        $form->submit($request->request->all());

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');

            $em->merge($aSheet);    // Pas nécessaire, juste pas mesure de clarté
            $em->flush();
            return $aSheet;
        }

        return $form;
    }

    /**
     * @Rest\View(statusCode=Response::HTTP_NO_CONTENT)
     * @Rest\Delete("/account/sheet/{id}")
     */
    public function removeAccountSheetAction($id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $account = $em->getRepository('AppBundle:AccountSheet')
                    ->find($id);

        $em->remove($account);
        $em->flush();
    }

    private function notFound($type){
        return \FOS\RestBundle\View\View::create(['message' => "$type not found"], Response::HTTP_NOT_FOUND);
    }
}
