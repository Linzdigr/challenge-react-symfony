<?php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Entity\Account;

class AccountController extends Controller
{
    /**
     * @Route("/account", name="account_list")
     * @Method({"GET"})
     */
    public function indexAccount(Request $request)
    {
        return new JsonResponse([
            new Account("Account 1", "Account for transport costs"),
            new Account("Account 2", "Restoration expenses"),
            new Account("Account 3", "Some other unknown stuff")
        ]);
    }

    /**
     * @Route("/account{account}",
     * name="account_get",
     * requirements={"$account": "\d+"}),
     * defaults={"_format": "json"}
     * @Method({"GET"})
     */
    public function getAccount($account = 1)
    {
        return new JsonResponse([
            new Account("Account 1", "Account for transport costs"),
            new Account("Account 2", "Restoration expenses"),
            new Account("Account 3", "Some other unknown stuff")
        ]);
    }
}
