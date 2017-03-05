<?php
namespace AppBundle\Controller\REST;

use AppBundle\Controller\REST\BaseRestController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use AppBundle\Form\Type\OperationType;
use AppBundle\Entity\Operation;

class OperationController extends BaseRestController{
    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operations", name="operation_list")
     */
    public function getOperationsAction($account_id, $sheet_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if(empty($aSheet))
            $this->notFound('Sheet');

        return $this->apiResponse($aSheet->getOperations());
    }

    /**
     * @Method("GET")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_one")
     */
    public function getOperationAction($account_id, $sheet_id, $operation_id, Request $request){
        $account = $this->get('doctrine.orm.entity_manager')
            ->getRepository('AppBundle:Account')
            ->find($account_id);

        if(empty($account))
            return $this->notFound('Account');

        $aSheet = $account->getSheetById($sheet_id);

        if(empty($aSheet))
            $this->notFound('Sheet');

        return $this->apiResponse($aSheet->getOperationById($operation_id));
    }

    /**
     * @Method("POST")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation", name="operation_create")
     */
    public function postOperationAction($account_id, $sheet_id, Request $request)
    {
        $operation = new Operation();

        if ($content = $request->getContent()) {
            $jsonPost = json_decode($content, true);
        }

        if(empty($jsonPost['category_id']))
            return $this->notFound('category_id');

        $cat = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Category')
                ->find($jsonPost['category_id']);

        if(empty($cat))
            return $this->notFound('Category');
        unset($jsonPost['category_id']);

        $aSheet = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:AccountSheet')
                ->find($sheet_id);

        if(empty($aSheet))
            return $this->notFound('Sheet');

        $operation->setCategory($cat);

        $operation->setAccountSheet($aSheet);

        $form = $this->createForm(OperationType::class, $operation);

        $form->submit($jsonPost);

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');
            $em->persist($operation);
            $em->flush();

            return $this->apiResponse($operation, Response::HTTP_CREATED);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("PUT")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_modify")
     */
    public function putOperationAction($account_id, $sheet_id, $operation_id, Request $request){
        $operation = $this->get('doctrine.orm.entity_manager')
                    ->getRepository('AppBundle:Operation')
                    ->find($operation_id);

        if ($content = $request->getContent()) {
            $jsonPost = json_decode($content, true);
        }

        if (empty($operation))
            return $this->notFound('Operation');

        if(empty($jsonPost['category_id']))
            return $this->notFound('category_id');

        $cat = $this->get('doctrine.orm.entity_manager')
                ->getRepository('AppBundle:Category')
                ->find($jsonPost['category_id']);

        if(empty($cat))
            return $this->notFound('Category');

        unset($jsonPost['category_id']);

        $operation->setCategory($cat);

        $form = $this->createForm(OperationType::class, $operation);

        $form->submit($jsonPost);

        if ($form->isValid()) {
            $em = $this->get('doctrine.orm.entity_manager');

            $em->merge($operation);    // Pas nécessaire, juste pas mesure de clarté
            $em->flush();
            return $this->apiResponse($operation);
        }

        return $this->apiResponse($form, Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * @Method("DELETE")
     * @Route("/account/{account_id}/sheet/{sheet_id}/operation/{operation_id}", name="operation_destroy")
     */
    public function removeOperationAction($account_id, $sheet_id, $operation_id, Request $request){
        $em = $this->get('doctrine.orm.entity_manager');
        $operation = $em->getRepository('AppBundle:Operation')
                    ->find($id);

        if($operation){
            $em->remove($operation);
            $em->flush();
        }

        return $this->apiResponse([]);
    }
}
