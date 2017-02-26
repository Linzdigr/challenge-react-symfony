<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use AppBundle\Entity\GenericEntity;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="operations")
     * @ORM\HasLifecycleCallbacks
     */
    class Operation{
        /* As columnDefinition="ENUM(type_operation) not working with pg */
        const DEBIT_CODE = 0;
        const CREDIT_CODE = 1;

        /**
         * @ORM\Id
         * @ORM\Column(type="integer", nullable=false)
         * @ORM\GeneratedValue(strategy="IDENTITY")
         */
        protected $id;

        /**
         * @ORM\Column(type="integer")
         */
        protected $type;

        /**
         * @ORM\Column(type="string")
         */
        protected $label;

        /**
         * @ORM\Column(type="float")
         */
        protected $montant;

        /**
         * @ORM\Column(type="string")
         */
        protected $comment;

        /**
         * @ORM\ManyToOne(targetEntity="AppBundle\Entity\AccountSheet", inversedBy="operations")
         * @ORM\JoinColumn(nullable=false)
         * @var AccountSheet
         */
        protected $accountSheet;

        /**
         * @ORM\ManyToOne(targetEntity="AppBundle\Entity\Category", inversedBy="operations")
         * @var Category
         */
        protected $category;

        public function __construct($type = null, $label = null, $montant = null, $comment = null){
            $this->name = $name;
            $this->comment = $comment;
            $this->montant = $montant;
            $this->address = $address;
        }

        public function setAccountSheet(AccountSheet $aSheet){
            $this->accountSheet = $aSheet;

            return $this;
        }

        public function setCategory(Category $cat){
            $this->category = $cat;

            return $this;
        }

        public function getAccountSheet(){
            return $this->accountSheet;
        }

        public function getType(){
            return $this->type;
        }

        public function getMontant(){
            return $this->montant;
        }

        public function __destruct(){}
    }
